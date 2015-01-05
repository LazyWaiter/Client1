'use strict';


angular.module('myApp.command', ['ngRoute'])

.controller('CommandCtrl',['$scope','$http',function($scope,$http) {
        
        $scope.tables = [
            {id:"101",name:"Everest"},
            {id:"102",name:"Mont-Blanc"},
            {id:"103",name:"Kilimandjaro"}
        ];
        
        $scope.selectedTable = {value : $scope.tables[0]};
        
        $scope.cocktails = [
            {id:"201",name:"Grzaniec"},
            {id:"202",name:"Glögi"},
            {id:"203",name:"Gimlet"}
        ];
        
        $scope.selectedCocktail = {value:$scope.cocktails[0]};
        
        /* utiliser variables ci dessous pour effectuer enregistrement en bdd */
        $scope.sendCommand = function(){
   
	var tableauProd =[{name:$scope.selectedCocktail.value.name,quantity:'1',price:'1'}];
	var command=[{tableNumber:$scope.selectedTable.value.id,createdAt:'05/01/2015',products:tableauProd,status:'to_prepare'}];
console.log(command);

	   var request = $http.put('https://lazywaiter.couchappy.com/orders/', command);
		request.success(function(data, status, headers, config) 
		{
		alert("Requête effectuée avec succès");
		});
		request.error(function(data, status, headers, config)
		{
		alert("Erreur" + data + status + headers + config);
		});
        };
}]);
