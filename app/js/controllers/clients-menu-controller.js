angular.module('companyModule')
    .controller('clientMenuController', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state){
        
        const SERVER='https://seminar4-dinabogdan.c9users.io'
        
        $scope.searchClient=(client) => {
            
            $http.get(SERVER + '/clients/' + client.firstName+ '/' + client.lastName)
                .then((response) => {
                    $scope.clients=response.data
                    
                })
                .catch((error) => console.log(error))
                
        }
        
        $scope.selected={}
        
        $scope.getTemplate=(client) => {
            if(client.lastName==$scope.selected.lastName && client.firstName==$scope.selected.firstName){
                return 'edit'
            }
            
            return 'display'
        }
        
        $scope.editClient=(client) => {
            $scope.selected=client
        }
        
        $scope.cancelEditing=() =>{
                $scope.selected={}
        }
        
        $scope.deleteClient=(client) => {
                $http.delete(SERVER + '/clients/' + client.firstName + '/' + client.lastName)
                    .then((response) => {
                        $state.go($state.current, {}, {
                            reload:true
                        })
                    })
                    .catch((error) => console.log(error))
        }
        
        $scope.saveClient=(client) =>{
                $http.put(SERVER + '/clients/' + client.firstName + '/' + client.lastName, client)
                    .then((response) => {
                        $state.go($state.current, {}, {
                            reload:true
                        })
                    })
                    .catch((error) => console.log(error))
        }
        
    }])