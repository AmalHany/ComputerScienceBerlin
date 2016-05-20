
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
      .otherwise({redirectTo: '/'});;

      //$locationProvider.html5Mode(true);
  }

  // if an unauthenticated user tries to visit the profile page they will be redirected to the login
  function run($rootScope, $location, $http, $window) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !$rootScope.isLoggedIn) {
        $location.path('/login');
      }
    });
  }

  mainApp
  .config(['$routeProvider', '$locationProvider', config])
  .run(['$rootScope', '$location', '$http', '$window', run]);
