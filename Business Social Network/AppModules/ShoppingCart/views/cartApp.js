var cartApp = angular.module('cartApp', []);


  cartApp.controller('shopAdd', function($scope, $http) {

      $scope.add2ShoppingCart = function(){
        if($scope.productName !== null)
        {
          var config = {
            method: "POST",
            url: "/ShoppingCart",
            data: {productName: $scope.productName},
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
          $http(config).then(function(response) {
              $scope.productName = null;
        
          });
         }
      }

  });