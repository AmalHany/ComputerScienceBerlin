var productApp = angular.module('productApp'. []);

productApp.controller('ProductController',
['$routeParams',
function($scope, $routeParams){
  $scope.getProduct = function(){

    var config = {
        method: "GET",
        url: "/Product",
         headers: {"Content-Type": "application/json;charset=utf-8"}
    };
    $http(config).then(function(response){
    });
  }
  $scope.getProduct();
}

]);
