var userAuthApp = angular.module('userAuthApp', ['MessageSocketService']);

userAuthApp.controller('RegisterController',['$scope', '$location', '$http', '$window', function($scope, $location, $http, $window) {
  $scope.credentials = {};

  $scope.onSubmit = function () {

    $http.post('/users/register', $scope.credentials).success(function(data){
      $window.sessionStorage['mean-token'] = data.token;
      $rootScope.isLoggedIn = true;
    })
    .error(function(err){
      alert(err);
    })
    .then(function(){
      $location.path('/');
    });
  };

}]);

userAuthApp.controller('LoginController',['$rootScope', '$scope', '$location', '$http', '$window', function($rootScope, $scope, $location, $http, $window, MessageSocket) {
  $scope.credentials = {};

  $scope.onSubmit = function () {

    $http.post('/users/login', $scope.credentials).success(function(data) {
      $window.sessionStorage['mean-token'] = data.token;
      $rootScope.isLoggedIn = true;
    })
    .error(function(err){
      alert(err);
    })
    .then(function(){
      $location.path('/');
    });
  };

}]);

userAuthApp.controller('NavigationController',['$rootScope', '$scope', '$location', '$http', '$window', 'MessageSocket', function($rootScope, $scope, $location, $http, $window, MessageSocket){

  $rootScope.isLoggedIn = false;
  $rootScope.currentUser = null;

  var token = $window.sessionStorage['mean-token'];

  if(token){
    var user;
    user = token.split('.')[1];
    user = $window.atob(user);
    user = JSON.parse(user);

    $rootScope.isLoggedIn = user.exp > Date.now() / 1000;

    if($rootScope.isLoggedIn)
    {
      $rootScope.currentUser = user;
    }
  }

  $scope.logout = function(){
    $window.sessionStorage.removeItem('mean-token');
    $rootScope.currentUser = null;
    $rootScope.isLoggedIn = false;
    $location.path('/');
  };

}]);

// function connect_socket(url, token) {
//   var socket = io.connect(url, {
//     query: 'token=' + token
//   });
//
//   socket.on('connect', function () {
//     console.log('authenticated');
//   }).on('disconnect', function () {
//     console.log('disconnected');
//   }).on("error", function(error) {
//     if (error.type == "UnauthorizedError" || error.code == "invalid_token") {
//       console.log("User's token is invalid");
//     }
//   });
// }
