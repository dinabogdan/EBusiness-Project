angular.module('companyModule')
    .controller('carMenuController', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state){
        
        const SERVER='https://seminar4-dinabogdan.c9users.io'
        
        $scope.searchCar=(car) => {
            
            $http.get(SERVER + '/cars/' + car.carNumber)
                .then((response) =>{
                    $scope.cars=response.data
                })
                .catch((error) => console.log(error))
        }
        
        $scope.selected={}
        
        $scope.getTemplate=(car) => {
            if(car.carNumber==$scope.selected.carNumber){
                return 'edit'
            }
            
            return 'display'
        }
        
        $scope.editCar=(car) => {
            $scope.selected=car
        }
        
        $scope.cancelEditing=() =>{
                $scope.selected={}
        }
        
        $scope.deleteCar=(car) => {
                $http.delete(SERVER + '/cars/' + car.carNumber)
                    .then((response) => {
                        $state.go($state.current, {}, {
                            reload:true
                        })
                    })
                    .catch((error) => console.log(error))
        }
        
         $scope.saveCar=(car) =>{
                $http.put(SERVER + '/cars/' + car.carNumber, car)
                    .then((response) => {
                        $state.go($state.current, {}, {
                            reload:true
                        })
                    })
                    .catch((error) => console.log(error))
        }
        
    }])