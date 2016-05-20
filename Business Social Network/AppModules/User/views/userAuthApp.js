var userAuthApp = angular.module('userAuthApp', []);

userAuthApp.controller('RegisterController',['$scope', '$location', '$http', '$window', function($scope, $location, $http, $window) {
  $scope.credentials = {};

  $scope.onSubmit = function () {

    $http.post('/users/register', $scope.credentials).success(function(data){
      $window.sessionStorage['mean-token'] = data.token;
    })
    .error(function(err){
      alert(err);
    })
    .then(function(){
      $location.path('profile');
    });
  };

}]);

userAuthApp.controller('LoginController',['$scope', '$location', '$http', '$window', function($scope, $location, $http, $window) {
  $scope.credentials = {};

  $scope.onSubmit = function () {

    $http.post('/users/login', $scope.credentials).success(function(data) {
      $window.sessionStorage['mean-token'] = data.token;
    })
    .error(function(err){
      alert(err);
    })
    .then(function(){
      $location.path('profile');
    });
  };

}]);

userAuthApp.controller('ProfileController',['$rootScope', '$scope', '$http', '$window', function($rootScope, $scope, $http, $window) {
  $scope.user = {};

  $http.get('/users/profile', {
    headers: {
      Authorization: 'Bearer '+ $window.sessionStorage['mean-token']
    }
  })
  .success(function(data) {
    $scope.user = data;
    $rootScope.currentUser = data;
    $rootScope.isLoggedIn = true;
  })
  .error(function (e) {
    console.log(e);
  });
}]);
