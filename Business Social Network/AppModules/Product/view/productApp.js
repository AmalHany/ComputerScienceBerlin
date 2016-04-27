var productApp = angular.module('productApp'. []);

productApp.controller('ProductController',
function($scope, $http){
  $scope.getProduct = function(){

    var config = {
        method: "GET",
        url: "/Product",
         headers: {"Content-Type": "application/json;charset=utf-8"}
    };
    $http(config).then(function(response){
     $scope.products = response.data;
    });
  }

  $scope.makeOffer() = function(){
    if($scope.Name !==null
    && $scope.Name !==""
    && $scope.Name !==  undefined){
    var config = {
      method : "POST",
      url: "/Product",
      data:{Name: "Offer on "+ $scope.productName,
            Price: $scope.productPrice,
            ProductDescription: $scope.ProductDescription
            
          },
        headers: {"Content-Type": "application/json;charset=utf-8"}
    };
    $http(config).then(function(response){
      $scope.getProduct();
      $scope.productName = null;
             $scope.productPrice = null;
             $scope.ProductDescription = null;
             $scope.tags=null;
    });
  }
  }
  $scope.getProduct();


}
);
