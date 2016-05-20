
var mainApp = angular.module('mainApp', [ 'ngRoute', 'userAuthApp', 'wishListApp', 'searchApp']);

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
      .when('/profile', {
          templateUrl: '/partials/User/profile.html',
          controller: 'ProfileController'
      })
      .when('/logout', {
          templateUrl: '/',
          controller: 'LogoutController'
      })
      .otherwise({redirectTo: '/'});;

      //$locationProvider.html5Mode(true);
  }

  // if an unauthenticated user tries to visit the profile page they will be redirected to the homepage
  function run($rootScope, $location, $http, $window) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !authentication($http, $window).isLoggedIn()) {
        $location.path('/');
      }
    });
  }

  mainApp.controller('NavigationController',['$rootScope', '$scope', '$location', '$http', '$window', function($rootScope, $scope, $location, $http, $window){
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

  mainApp
  .config(['$routeProvider', '$locationProvider', config])
  .run(['$rootScope', '$location', '$http', '$window', run]);
