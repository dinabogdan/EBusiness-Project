'use strict'
const express=require('express')
const bodyParser=require('body-parser')
const Sequelize=require('sequelize')
const sequelize=new Sequelize('proiect', 'root', '')


let app=express()
app.use(express.static(__dirname + '/app'))
app.use(bodyParser.json())

let Company=sequelize.define('company', {
    name:{
        allowNull:false,
        type:Sequelize.STRING
    }
})

let Client=sequelize.define('client', {
    firstName:{
        allowNull:false,
        type:Sequelize.STRING
    },
    lastName:{
        allowNull:false,
        type:Sequelize.STRING
    },
    age:{
        allowNull:false,
        type:Sequelize.INTEGER
    }
})

let Car=sequelize.define('car', {
    model:{
        allowNull:false,
        type:Sequelize.STRING
    },
    carNumber:{
        allowNull:false,
        type:Sequelize.STRING
    }
})

Company.hasMany(Client, {
    foreignKey:'insuranceCompanyId'
})

Client.belongsTo(Company, {
    foreignKey:'insuranceCompanyId'
})

Client.hasMany(Car, {
    foreignKey:'clientId'
})

Car.belongsTo(Client, {
    foreignKey:'clientId'
})

app.get('/create', (req, res, next) => {
    sequelize
        .sync({
            force:true
        })
        .then(() => {
          res.status(201).send('Created')  
        })
        .catch((error) => {
            next(error)
            return;
        })
})

app.get('/companies', (req, res, next) => {
    Company
        .findAll({
            attributes: ['id', 'name']
        })
        .then((companies) => {
            console.log(companies);
            res.status(200).send(companies)
        })
        .catch((error) => {
            next(error)
            return;
        })
})

app.post('/companies', (req, res, next) => {
    Company
        .create(req.body)
        .then(() => {
            res.status(201).send('created')
        })
        .catch((error) => {
           next(error)
           return;
        })
})

app.get('/companies/:id', (req, res, next) => {
    Company
        .find({
            attributes: ['id', 'name'],
            where:{
                id:req.params.id
            }
        })
        .then((company) => {
            res.status(200).send(company)
        })
        .catch((error)=>{
            next(error)
            return;
        })
})

app.delete('/companies/:id', (req, res, next) => {
    Company
        .find({
            where:{
                id:req.params.id
            }
        })
        .then((company) => {
            return company.destroy()
        })
        .then(() => {
            res.status(201).send('removed')
        })
        .catch((error) => {
            next(error)
            return;
        })
})

app.put('/companies/:id', (req, res, next) => {
    Company
        .find({
            where: {
                id:req.params.id
            }
        })
        .then((company) => {
            return company.updateAttributes(req.body)
        })
        .then(() => {
            res.status(201).send('updated')
        })
        .catch((error) => {
            next(error)
            return;
        })
})


app.get('/companies/:id/clients', (req, res, next) => {
    Company
        .find({
            where:{
                id: req.params.id
            },
            include: [Client]
        })
        .then((company) => {
            console.log(company.name)
            return company.getClients()
            
        })
        .then((clients) => {
            res.status(200).send(clients)
            
        })
        .catch((error) => {
            next(error)
            return;
        })
        
})

app.post('/companies/:id/clients', (req, res, next) => {
    Company
        .find({
            where:{
                id:req.params.id
            }
        })
        .then((company) => {
            let client=req.body
            client.insuranceCompanyId=company.id
            return Client.create(client)
        })
        .then(() => {
            res.status(201).send('created')
        })
        .catch((error) => {
            next(error)
            return;
        })
})

app.delete('/companies/:id/clients/:cId', (req, res, next) => {
    Client
        .find({
            where: {
                id:req.params.cId
            }
        })
        .then((client) => {
            return client.destroy()
        })
        .then(() => {
            res.status(201).send('removed')
        })
        .catch((error) => {
            next(error)
            return;
        })
})

app.put('/companies/:id/clients/:cId', (req, res, next) => {
    Client
        .find({
            where:{
                id:req.params.cId
            }
        })
        .then((client) => {
            client.firstName=req.body.firstName
            client.lastName=req.body.lastName
            client.age=req.body.age
            return client.save()
        })
        .then(() => {
            res.status(201).send('modified')
        })
        .catch((error) => {
            next(error)
            return;
        })
})


app.get('/companies/:id/clients/:cId/cars', (req, res, next) => {
    Client
        .find({
            where:{
                insuranceCompanyId:req.params.id,
                id:req.params.cId
            },
            include: [Car]
        })
        .then((client) => {
            return client.getCars()
        })
        .then((cars) => {
            res.status(200).send(cars)
        })
        .catch((error) => {
            next(error)
            return;
        })
})

app.post('/companies/:id/clients/:cId/cars', (req, res, next) => {
    Client.find({
        where:{
            id:req.params.cId
        }
    })
    .then((client) => {
        let car=req.body
        car.clientId=client.id
        return Car.create(car)
    })
    .then(() => {
        res.status(201).send('created')
    })
    .catch((error) => {
        next(error)
        return;
    })
})

app.put('/companies/:id/clients/:cId/cars/:carId', (req, res, next) => {
    Car
        .find({
            where:{
                id:req.params.carId
            }
        })
        .then((car) => {
            car.model=req.body.model
            car.carNumber=req.body.carNumber
            return car.save()
        })
        .then(() => {
            res.status(201).send('modified')
        })
        .catch((error) => {
            next(error)
            return;
        })
})

app.delete('/companies/:id/clients/:cId/cars/:carId', (req, res, next) => {
    Car
        .find({
            where:{
                id:req.params.carId
            }
        })
        .then((car) => {
            return car.destroy()
        })
        .then(() => {
            res.status(201).send('removed')
        })
        .catch((error) => {
            next(error)
            return;
        })
        
})

app.get('/clients/:firstName/:lastName', (req, res, next) => {
    Client
        .findAll({
            attributes:['id', 'firstName', 'lastName', 'age'],
            where:{
                firstName:req.params.firstName,
                lastName:req.params.lastName
            }
        })
        .then((clients) => {
            res.status(200).send(clients)
        })
        .catch((error) => {
            next(error)
            return;
        })
})

app.delete('/clients/:firstName/:lastName', (req, res, next) => {
    Client
        .find({
            where:{
                firstName:req.params.firstName,
                lastName:req.params.lastName
            }
        })
        .then((client) => {
            return client.destroy()
        })
        .then(() => {
            res.status(201).send('removed')
        })
        .catch((error) => {
            next(error)
            return;
        })
})

app.put('/clients/:firstName/:lastName', (req, res, next) => {
    Client
        .find({
            where: {
                firstName:req.params.firstName,
                lastName:req.params.lastName
            }
        })
        .then((client) => {
            return client.updateAttributes(req.body)
        })
        .then(() => {
            res.status(201).send('updated')
        })
        .catch((error) => {
            next(error)
            return;
        })
})

app.get('/cars/:carNumber', (req, res, next) => {
    Car
        .findAll({
            attributes:['id', 'model', 'carNumber'],
            where:{
                carNumber:req.params.carNumber
            }
        })
        .then((cars) => {
            res.status(200).send(cars)
        })
        .catch((error) => {
            next(error)
            return;
        })
})

app.delete('/cars/:carNumber', (req, res, next) => {
    Car
        .find({
            where:{
                carNumber:req.params.carNumber
            }
        })
        .then((car) => {
            return car.destroy()
        })
        .then(() => {
            res.status(201).send('removed')
        })
        .catch((error) => {
            next(error)
            return;
        })
        
})

app.put('/cars/:carNumber', (req, res, next) => {
    Car
        .find({
            where: {
                carNumber:req.params.carNumber
            }
        })
        .then((car) => {
            return car.updateAttributes(req.body)
        })
        .then(() => {
            res.status(201).send('updated')
        })
        .catch((error) => {
            next(error)
            return;
        })
})



app.get('*', (req, res) => {
    res.send('Hello from the other side!')
})

app.use(function(err, req, res, next){
    switch (res.status()) {
        case 500:
            res.status(500).send('There aren`t unicorns here!')
            break;
        case 404:
            res.status(404).send('I don`t have money in the database for you!')
            break;
        default:
            res.status(500).send('Simply Internal Server Error')
    }
   
});

app.listen(8080)




