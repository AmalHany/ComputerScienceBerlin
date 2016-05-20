
var mainApp = angular.module('mainApp', [ 'ngRoute','messageApp', 'userAuthApp', 'wishListApp', 'searchApp', 'MessageSocketService']);

  function config($routeProvider, $locationProvider) {

    $routeProvider.
      when('/wishlist/:wishlistId', {
        templateUrl: '/partials/WishList/wishlist.html',
        controller: 'WishListController'
      })
      .when('/search', {
          templateUrl: '/partials/Search/searchBox.html',
          controller: 'SearchBoxController'
      })
      .when('/register', {
          templateUrl: '/partials/User/register.html',
          controller: 'RegisterController'
      })
      .when('/login', {
          templateUrl: '/partials/User/login.html',
          controller: 'LoginController'
      })
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
  .run(['$rootScope', '$location', '$http', '$window', run])
  .run(['$http', '$rootScope', '$window','messageSocket', populateUser]);
