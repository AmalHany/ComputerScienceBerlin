
// create main angular application and add dependencies
var mainApp = angular.module('mainApp', [ 'ngRoute','messageApp', 'userAuthApp', 'wishListApp', 'searchApp', 'MessageSocketService']);

  function config($routeProvider, $locationProvider) {

    // angular application routing
    $routeProvider.
      when('/wishlist/:wishlistId', {
        templateUrl: '/partials/WishList/wishlist.html',
        controller: 'WishListController'
      })
      .when('/search', {
          templateUrl: '/partials/Search/searchBox.html',
          controller: 'SearchBoxController'
      })
      // route to registration page
      .when('/register', {
          templateUrl: '/partials/User/register.html',
          controller: 'RegisterController'
      })
      // route to login page
      .when('/login', {
          templateUrl: '/partials/User/login.html',
          controller: 'LoginController'
      })
      // route to test message interface page
      .when('/message', {
          templateUrl: '/partials/Message/message.html',
          controller: 'MessageController'
      })
      .otherwise({redirectTo: '/'});;

      //$locationProvider.html5Mode(true);
  }


  function run($rootScope, $location, $http, $window) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      // if an unauthenticated user tries to visit the profile page they will be redirected to the login
      if (($location.path() === '/message')
            && !$rootScope.isLoggedIn) {
        $location.path('/login');
      }
      // if user logged in do not route to login or registration page
      if (($location.path() === '/login'
          || $location.path() === '/register')
          && $rootScope.isLoggedIn) {
        event.preventDefault();
      }
    });
  }

  mainApp
  .config(['$routeProvider', '$locationProvider', config])
  // populate this session's user information for global use
  .run(['$http', '$rootScope', '$window','messageSocket', populateUser])
  // run routing constraints
  .run(['$rootScope', '$location', '$http', '$window', run]);

  mainApp.controller('AlertController', ['$rootScope', '$scope', function($rootScope, $scope){
    $scope.errorAlert = 'clear';
    $scope.statusAlert = 'clear';

    $scope.errorHide = true;
    $scope.statusHide = true;

    // show error alert prompt for 5 seconds
    $rootScope.$on('setErrorAlert', function(event, msg){
      $scope.errorAlert = msg;
      $scope.errorHide = false;
      setTimeout(function ()
       {
         $scope.$apply(function()
         {
           $scope.errorHide = true;
         });
       }, 5000);
    });

    // show status alert prompt for 5 seconds
    $rootScope.$on('setStatusAlert', function(event, msg){
      $scope.statusAlert = msg;
      $scope.statusHide = false;
      setTimeout(function ()
       {
         $scope.$apply(function()
         {
           $scope.statusHide = true;
         });
       }, 5000);
    });

  }]);
