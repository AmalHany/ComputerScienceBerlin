var ProdreviewsApp = angular.module('prodreviewApp', []);


  ProdreviewsApp.controller('reviewadd', function($scope, $http) {

     $scope.getProdReviews = function(){
        var config = {
          method: "GET",
          url: "/prodreviews",
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.productreviews = response.data;
        });
      }

      $scope.addProdReviews = function(){
        console.log("OO");
        
        if($scope.Text!== null && $scope.Text!== "")
        
        
        {
          var config = {
            method: "POST",
            url: "/prodreviews",
            data: {Text: $scope.Text},
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
          $http(config).then(function(response) {
              $scope.getProdReviews();
              $scope.Text = null;
              
    
          });
         }
      }

       $scope.getProdReviews();


  });