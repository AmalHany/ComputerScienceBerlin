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

userAuthApp.controller('LoginController',['$rootScope', '$scope', '$location', '$http', '$window', function($rootScope, $scope, $location, $http, $window) {
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
      $location.path('/profile');
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
  })
  .error(function (e) {
    console.log(e);
  });
}]);

userAuthApp.controller('NavigationController',['$rootScope', '$scope', '$location', '$http', '$window', function($rootScope, $scope, $location, $http, $window){
  $rootScope.isLoggedIn = (function() {
    var token = $window.sessionStorage['mean-token'];
    var payload;

    if(token){
      payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  })();

  $rootScope.currentUser = null;

  if($rootScope.isLoggedIn)
  {
    $rootScope.currentUser = (function() {
        var token = $window.sessionStorage['mean-token'];
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          first_name : payload.first_name,
          last_name : payload.last_name
        };
    })();
  }

  $scope.logout = function(){
    $window.sessionStorage.removeItem('mean-token');
    $rootScope.currentUser = null;
    $rootScope.isLoggedIn = false;
    $location.path('/');
  };

}]);
