const app=angular.module('insurancesApp', [
    'ui.router',
    'ngMessages',
    'companyModule'])
    
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home')
    $stateProvider
        .state('home', {
            url:'/home',
            templateUrl:'views/home.html'
        })
        .state('companies', {
            url:'/companies',
            templateUrl:'views/companies.html',
            controller:'companyController'
        })
        .state('clientsOfCompany', {
            url:'/companies/:id',
            templateUrl:'views/clients.html',
            controller:'clientController'
        })
        .state('clientCars', {
            url:'/companies/:id/clients/:cId',
            templateUrl:'views/cars.html',
            controller:'carController'
        })
        .state('clientMenu',{
            url:'/clients',
            templateUrl:'views/clients-menu.html',
            controller:'clientMenuController'
        })
        .state('cars', {
            url:'/cars',
            templateUrl:'views/cars-menu.html',
            controller:'carMenuController'
        })
        .state('about', {
            url:'/about',
            templateUrl:'views/about.html'
        })
}])