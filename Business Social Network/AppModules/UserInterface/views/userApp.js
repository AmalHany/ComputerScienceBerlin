var userApp = angular.module('userApp', []);

userApp.controller('userController',
  function($scope, $http,$routeParams) {
    
    $scope.getUser = function(){

      var config ={
        method: "GET",
        url: "/users/" + $routeParams.userId,
        headers: {"Content-Type": "application/json;charset=utf-8"}
      };
              $http(config).then(function(response) {
              $scope.user = response.data;


        });
      }
    $scope.getUser();
   }
);