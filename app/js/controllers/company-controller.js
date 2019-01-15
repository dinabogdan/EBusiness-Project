const ctrl=angular.module('companyModule', ['ui.router'])

const SERVER='https://seminar4-dinabogdan.c9users.io'


ctrl.controller('companyController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    
    let $constructor=()=>{
            $http.get(SERVER + '/companies')
                .then((response) => {
                    $scope.companies=response.data
                })
                .catch((error) => console.log(error))
    }
    
            $scope.addCompany=(company) => {
                $http.post(SERVER + '/companies', company)
                    .then((response) => {
                      $state.go($state.current, {}, {
                          reload:true
                      })  
                    })
                    .catch((error) => console.log(error))
            }
            
            /*$scope.searchCompany=(company) => {
                $http.get(SERVER + '/companies/:name')
                    .then((response) => {
                        $scope.companies=response.data
                    })
                    .catch((error) => {console.log(error)})
            }*/
            
            $scope.deleteCompany=(company) => {
                $http.delete(SERVER + '/companies/' + company.id)
                    .then((response) => {
                        $state.go($state.current, {}, {
                            reload:true
                        })
                    })
                    .catch((error) => console.log(error))
            }
            
            $scope.selected={}
            
            $scope.editCompany=(company) => {
                $scope.selected=company
            }
            
            $scope.cancelEditing=() =>{
                $scope.selected={}
            }
            
            $scope.getTemplate=(company) =>{
                if(company.id==$scope.selected.id){
                    return 'edit'
                }
                return 'display'
            }
            
            
            $scope.saveCompany =(company) =>{
                $http.put(SERVER + '/companies/' + company.id, company)
                    .then((response) => {
                        $state.go($state.current, {}, {
                            reload:true
                        })
                    })
                    .catch((error) => console.log(error))
            }
            
            
    
    $constructor()
}])