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
      $scope.getProduct();
    });
  }
  $scope.getProduct();

  $scope.addProduct = function(){
    if($scope.Name !==null
    && $scope.Name !==""
    && $scope.Name !==  undefined)
    {
      var config = {
        method:"POST",
        url:"/Product",
        data: {title: $scope.Name},
        headers: {"Content-Type": "application/json;charset=utf-8"}

      };

    }
  }
}

]);
