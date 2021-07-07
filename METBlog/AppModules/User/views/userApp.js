var userApp = angular.module('userApp', []);

userApp.controller('signUpController',
  function($scope, $http, $location) {

    $scope.newUser = {};

    $scope.addUser = function(){
      var config = {
        method: "POST",
        url: "/users/signup",
        data: {newUser: $scope.newUser},
        headers: {"Content-Type": "application/json;charset=utf-8"}
      };
      $http(config).then(function(response) {
        $location.path('/');
      });
    };

  }
);

userApp.controller('signInController',
  function($scope, $http, $location) {

    $scope.signUser = function(){
      var config = {
        method: "POST",
        url: "/users/signin",
        data: {user: $scope.user},
        headers: {"Content-Type": "application/json;charset=utf-8"}
      };
      $http(config).then(function(res) {

        if(res.data !== null)
        {
          $location.path('/');
        }
        else {
          $scope.error = "WRONG CREDENTIALS";
        }
      });
    };

  }
);
