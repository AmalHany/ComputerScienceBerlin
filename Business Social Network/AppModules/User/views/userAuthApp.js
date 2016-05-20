var userAuthApp = angular.module('userAuthApp', ['MessageSocketService']);

userAuthApp.controller('RegisterController',['$scope', '$location', '$http', '$window', 'messageSocket', function($scope, $location, $http, $window, messageSocket) {
  $scope.credentials = {};

  // submit user credentials form
  $scope.onSubmit = function () {

    // send post request to API with basic user information to register the user
    $http.post('/users/register', $scope.credentials).success(function(data){
      // obtain json web token of the regitered user
      $window.sessionStorage['mean-token'] = data.token;
      // populate global angular user object
      populateUser($http, $rootScope, $window, messageSocket);
    })
    .error(function(err){
      alert(err);
    })
    .then(function(){
      // redirect to root page
      $location.path('/');
    });
  };

}]);

userAuthApp.controller('LoginController',['$rootScope', '$scope', '$location', '$http', '$window', 'messageSocket', function($rootScope, $scope, $location, $http, $window, messageSocket) {
  $scope.credentials = {};

  // submit user credentials form
  $scope.onSubmit = function () {

    // send post request to API with basic user information to login the user
    $http.post('/users/login', $scope.credentials)
    .success(function(data) {
      // obtain json web token of the logged in user
      $window.sessionStorage['mean-token'] = data.token;
      // populate global angular user object
      populateUser($http, $rootScope, $window, messageSocket);
    })
    .error(function(err){
      alert(err);
    })
    .then(function(){
      // redirect to root page
      $location.path('/');
    });
  };

}]);

userAuthApp.controller('NavigationController',['$rootScope', '$scope', '$location', '$window', function($rootScope, $scope, $location, $window){

  // on logout
  $scope.logout = function(){
    // delete session json web token
    $window.sessionStorage.removeItem('mean-token');
    // clear global user object
    $rootScope.currentUser = {};
    // clear global user inbox
    $rootScope.currentUser.inbox = [];
    // change global state to not logged in
    $rootScope.isLoggedIn = false;
    // emit event to messageNotifyController to clear message notifications
    $rootScope.$emit('updateMessages');
    // redirect to root page
    $location.path('/');
  };

}]);

function populateUser($http, $rootScope, $window, messageSocket){

  var token = $window.sessionStorage['mean-token'];

  // initialize global variables
  $rootScope.currentUser = {};
  $rootScope.currentUser.inbox = [];
  $rootScope.isLoggedIn = false;

  if(token)
  {
    var user;
    // decode token
    user = token.split('.')[1];
    user = $window.atob(user);
    user = JSON.parse(user);

    // check if token is not expired
    $rootScope.isLoggedIn = user.exp > Date.now() / 1000;

    if($rootScope.isLoggedIn)
    {
      // populate global user object with more detailed user information
      // API call with JWT to get logged user details
      $http.get('/users/profile', {
        headers: {
          Authorization: 'Bearer '+ token
        }
      })
      .success(function(data) {
        // set global user
        $rootScope.currentUser = data;
      })
      .error(function (e) {
        console.log(e);
      })
      .then(function(){
        // API call with JWT to get logged user inbox
        $http.get('/messages/myMessages', {
          headers: {
            Authorization: 'Bearer '+ token
          }
        })
        .success(function(data) {
          // populate inbox object
          $rootScope.currentUser.inbox = data;
          // fire up realtime socket to long poll for new messages
          messageSocket.connect();
        })
        .error(function (e) {
          console.log(e);
        })
        .then(function(){
          // emit event to messageNotifyController to update new messages notification
          $rootScope.$emit('updateMessages');
        });
      });
    }
  }
}
