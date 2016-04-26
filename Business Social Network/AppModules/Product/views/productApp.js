var productsApp = angular.module('productApp', []);


  productsApp.controller('productCRUD', function($scope, $http) {

     $scope.getProducts = function(){
        var config = {
          method: "GET",
          url: "/products",
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.products = response.data;
        });
      }

      $scope.addProducts = function(){
        console.log("OO");
        if($scope.productName !== null
        && $scope.productName !== ""
        && $scope.productName !== undefined
        && $scope.productPrice !== null
        && $scope.productPrice !== ""
        && $scope.productPrice !== undefined
        && $scope.ProductDescription !== null
        && $scope.ProductDescription !== ""
        && $scope.ProductDescription !== undefined
        && $scope.tags !== null
        && $scope.tags !== ""
        && $scope.tags !== undefined)
        {
          var config = {
            method: "POST",
            url: "/products",
            data: {Name: $scope.productName,Price:$scope.productPrice,ProductDescription:$scope.ProductDescription,tags:$scope.tags},
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
          $http(config).then(function(response) {
              $scope.getProducts();
              $scope.productName = null;
              $scope.productPrice = null;
              $scope.ProductDescription = null;
              $scope.tags=null;
              


          });
         }
      }

      $scope.removeProduct = function(x){
        var config = {
          method: "DELETE",
          url: "/products",
          data: {productID: x._id},
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.getProducts();
        });
      }

    


       $scope.getProducts();


  });