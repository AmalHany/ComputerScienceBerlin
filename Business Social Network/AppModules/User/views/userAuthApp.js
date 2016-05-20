var userAuthApp = angular.module('userAuthApp', ['MessageSocketService']);

userAuthApp.controller('RegisterController',['$scope', '$location', '$http', '$window', 'messageSocket', function($scope, $location, $http, $window, messageSocket) {
  $scope.credentials = {};

  $scope.onSubmit = function () {

    $http.post('/users/register', $scope.credentials).success(function(data){
      $window.sessionStorage['mean-token'] = data.token;
      populateUser($http, $rootScope, $window, messageSocket);
    })
    .error(function(err){
      alert(err);
    })
    .then(function(){
      $location.path('/');
    });
  };

}]);

userAuthApp.controller('LoginController',['$rootScope', '$scope', '$location', '$http', '$window', 'messageSocket', function($rootScope, $scope, $location, $http, $window, messageSocket) {
  $scope.credentials = {};

  $scope.onSubmit = function () {

    $http.post('/users/login', $scope.credentials)
    .success(function(data) {
      $window.sessionStorage['mean-token'] = data.token;
      populateUser($http, $rootScope, $window, messageSocket);
    })
    .error(function(err){
      alert(err);
    })
    .then(function(){
      $location.path('/');
    });
  };

}]);

userAuthApp.controller('NavigationController',['$rootScope', '$scope', '$location', '$window', function($rootScope, $scope, $location, $window){

  $scope.logout = function(){
    $window.sessionStorage.removeItem('mean-token');
    $rootScope.currentUser = {};
    $rootScope.currentUser.inbox = [];
    $rootScope.isLoggedIn = false;
    $rootScope.$emit('updateMessages');
    $location.path('/');
  };

}]);

function populateUser($http, $rootScope, $window, messageSocket){

  var token = $window.sessionStorage['mean-token'];

  $rootScope.currentUser = {};
  $rootScope.currentUser.inbox = [];
  $rootScope.isLoggedIn = false;

  if(token)
  {
    var user;
    user = token.split('.')[1];
    user = $window.atob(user);
    user = JSON.parse(user);

    $rootScope.isLoggedIn = user.exp > Date.now() / 1000;

    if($rootScope.isLoggedIn)
    {

      $http.get('/users/profile', {
        headers: {
          Authorization: 'Bearer '+ token
        }
      })
      .success(function(data) {
        $rootScope.currentUser = data;
      })
      .error(function (e) {
        console.log(e);
      })
      .then(function(){
        $http.get('/messages/myMessages', {
          headers: {
            Authorization: 'Bearer '+ token
          }
        })
        .success(function(data) {
          $rootScope.currentUser.inbox = data;
          messageSocket.connect();
        })
        .error(function (e) {
          console.log(e);
        })
        .then(function(){
          $rootScope.$emit('updateMessages');
        });
      });
    }
  }
}

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
