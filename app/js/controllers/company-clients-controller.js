'use strict'
angular.module('companyModule')
    .controller('clientController', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state){
        const SERVER='https://seminar4-dinabogdan.c9users.io'
        
        
        let $constructor =() =>{
                console.log($stateParams.id)
                $http.get(SERVER +'/companies/'+ $stateParams.id)
                    .then((response) => {
                        console.log(response.data);
                        $scope.company=response.data
                        
                        return $http.get(SERVER + '/companies/' +$stateParams.id + '/clients')
                    })
                    .then((response) => {
                        console.log (response.data)
                        $scope.clients=response.data
                        
                    })
                    .catch((error) => console.log(error))
        }
        
        $scope.addClient=(client)=>{
            $http.post(SERVER + '/companies/' + $stateParams.id + '/clients', client)
                .then((response) => {
                    $state.go($state.current, {}, {
                        reload:true
                    })
                })
                .catch((error) => console.log(error))
        }
        
        $scope.deleteClient=(client) => {
            $http.delete(SERVER + '/companies/' + $stateParams.id + '/clients/' + client.id)
                .then((response) => {
                    $state.go($state.current, {}, {
                        reload: true
                    })
                })
                .catch((error) => console.log(error))
        }
        
        $scope.selected={}
        
        $scope.editClient=(client) => {
            $scope.selected=client
        }
        
        $scope.cancelEditing=() => {
            $scope.selected={}
        }
        
        $scope.getTemplate=(client) => {
            if(client.id == $scope.selected.id){
                return 'edit'
            }
            return 'display'
        }
        
        $scope.saveClient=(client) => {
            $http.put(SERVER + '/companies/' + $stateParams.id + '/clients/' + client.id, client)
                .then((response) => {
                    $state.go($state.current, {}, {
                        reload:true
                    })
                })
                .catch((error) => console.log(error))
        }
        
        $constructor()
    }])