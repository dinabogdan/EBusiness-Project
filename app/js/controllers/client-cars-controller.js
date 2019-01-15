angular.module('companyModule')
    .controller('carController', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state){
        
        const SERVER='https://seminar4-dinabogdan.c9users.io'
        
        let $constructor= () => {
                $http.get(SERVER + '/companies/' + $stateParams.id + '/clients/' + $stateParams.cId)
                    .then((response) => {
                        console.log('This is response 1 ', response);
                        $scope.client=response.data.clients
                        return $http.get(SERVER + '/companies/' + $stateParams.id + '/clients/' + $stateParams.cId + '/cars')
                    })
                    .then((response) => {
                        console.log('This is response 2 ',response)
                        $scope.cars=response.data
                    })
                    .catch((error) => console.log(error))
        }
        
        $scope.addCar = (car) => {
            $http.post(SERVER + '/companies/' + $stateParams.id + '/clients/' + $stateParams.cId + '/cars', car)
                .then((response) => {
                    $state.go($state.current, {}, {
                        reload:true
                    })
                })
                .catch((error) => console.log(error))
        }
        
        $scope.deleteCar =(car) => {
            $http.delete(SERVER + '/companies/' + $stateParams.id + '/clients/' + $stateParams.cId + '/cars/' + car.id)
                .then((response) => {
                    $state.go($state.current, {}, {
                        reload:true
                    })
                })
        }
        
        $scope.selected={}
        
        $scope.editCar=(car) => {
            $scope.selected=car
        }
        
        $scope.cancelEditing=() => {
            $scope.selected={}
        }
        
        $scope.getTemplate=(car) => {
            if(car.id==$scope.selected.id){
                return 'edit'
            }
            return 'display'
        }
        
        $scope.saveCar = (car) => {
            $http.put(SERVER + '/companies/' + $stateParams.id + '/clients/' + $stateParams.cId + '/cars/' + car.id, car)
                .then((response) => {
                    $state.go($state.current, {}, {
                        reload:true
                    })
                })
                .catch((error) => console.log(error))
        }
        
        $constructor()
        
    }])