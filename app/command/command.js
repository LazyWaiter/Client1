'use strict';

/* Mathis */
angular.module('myApp.command', ['ngRoute'])


.controller('CommandCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.tables = [
    {id: "101", name: "Everest"},
    {id: "102", name: "Mont-Blanc"},
    {id: "103", name: "Kilimandjaro"}
    ];

    $scope.selectedTable = {value: $scope.tables[0]};


    $scope.tabCommand = [];

    $scope.totalCommand = 0;

    $scope.counter = 1;

    $scope.inputQte = 1;

    $scope.addRow = function () {

        var exist = false;

        for (var i = 0; i < $scope.tabCommand.length; i++) {
            if ($scope.currentItem.Name == $scope.tabCommand[i].name) {
                $scope.tabCommand[i].quantity = parseInt($scope.tabCommand[i].quantity) +1 ;
                $scope.totalCommand = $scope.totalCommand +  parseInt($scope.tabCommand[i].price) ;
                exist = true;
            }
        }

        if (!exist) {
            $scope.tabCommand.push(
            {
                id : $scope.counter,
                name: $scope.currentItem.Name,
                quantity: inputQte.value,
                price: inputQte.value * $scope.currentItem.Price
            });
            $scope.totalCommand = $scope.totalCommand + ( parseInt($scope.tabCommand[i].price) * parseInt($scope.tabCommand[i].quantity) );
            $scope.counter++;
        }
    }


    $scope.deleteRow = function(id){
        for (var i = 0; i < $scope.tabCommand.length; i++) {
            if ($scope.tabCommand[i].id == id) {
                $scope.totalCommand = $scope.totalCommand - ( parseInt($scope.tabCommand[i].price) * parseInt($scope.tabCommand[i].quantity) );
                $scope.tabCommand.splice(i,1);
            }
        }
    }

    var categories = [
    {
        "Id": "1",
        "Name": "Cocktails",
        "Items": [
        {
            "Id": "1",
            "Name": "Grzaniec",
            "Price": 5
        },
        {
            "Id": "2",
            "Name": "Glögi",
            "Price": 6
        },
        {
            "Id": "3",
            "Name": "Gimlet",
            "Price": 7
        }
        ]
    },
    {
        "Id": "2",
        "Name": "Sodas",
        "Items": [
        {
            "Id": "4",
            "Name": "Coca",
            "Price": 1.5
        },
        {
            "Id": "5",
            "Name": "Orangina",
            "Price": 0.8
        },
        {
            "Id": "6",
            "Name": "Pepsi",
            "Price": 1
        }
        ]
    },
    {
        "Id": "3",
        "Name": "Boissons chaudes",
        "Items": [
        {
            "Id": "7",
            "Name": "Café",
            "Price": 1
        },
        {
            "Id": "8",
            "Name": "Chocolat chaud",
            "Price": 2
        },
        {
            "Id": "9",
            "Name": "Thé citron",
            "Price": 1.5
        }
        ]
    }
    ];

    $scope.categories = categories;
    $scope.currentCategorie = $scope.categories[0];
    $scope.currentItem = $scope.currentCategorie.Items[0];

    /* Partie de Nicolas STEFAN*/
    $scope.sendCommand = function () {
        var dateAujourdHui = new Date();
        var LaDate = dateAujourdHui.getTime();
        var tableauProd = [];

        var i=0;
        while(i < $scope.tabCommand.length)
        {
         tableauProd.push({name: $scope.tabCommand[i].name,quantity: $scope.tabCommand[i].quantity,price: $scope.tabCommand[i].price*$scope.tabCommand[i].quantity});
         i++;
        }



     var request = $http.post('https://lazywaiter.couchappy.com/orders/', 
     {
        tableNumber: $scope.selectedTable.value.id,
        createdAt: LaDate,
        products: tableauProd,
        status: 'to_prepare'
    });

     request.success(function (data, status, headers, config)
     {
        alert("Votre commande a été pris en compte");
        $scope.tabCommand = [];
    });
     request.error(function (data, status, headers, config)
     {
        alert("Une erreur est survenue la commande n'a pu être enregistrée");
    });
 };
 
}]);
