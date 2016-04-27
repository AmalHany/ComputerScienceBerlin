var reviewsApp = angular.module('reviewApp', []);


  reviewsApp.controller('reviewPost', function($scope, $http) {

     $scope.getReviews = function(){
        var config = {
          method: "GET",
          url: "/reviews",
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.reviews = response.data;
        });
      }

      $scope.addReviews = function(){
        
        if($scope.ReviewName !== null && $scope.ReviewName!== "" && $scope.ReviewDate !== null
        && $scope.ReviewDate !== "")
        
        
        {
          var config = {
            method: "POST",
            url: "/reviews",
            data: {Review: $scope.ReviewName,Dates:$scope.ReviewDate},
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
          $http(config).then(function(response) {
              $scope.getReviews();
              $scope.ReviewName = null;
              $scope.ReviewDate = null;
    
          });
         }
      }

       $scope.getReviews();


  });