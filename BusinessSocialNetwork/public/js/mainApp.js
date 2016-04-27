var mainApp = angular.module('mainApp', ['ngRoute', 'signupApp']);

  mainApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/signup', {
        templateUrl: '/partials/signup/index.html',
        controller: 'signupCtrl'
      });
  }]);

/*
  var mainApp = angular.module('mainApp', ['ngRoute', 'signupApp']);

  mainApp.controller('aboutController', function($scope){});

  mainApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/partials/about.html',
        controller: 'aboutController'
      }).
      when('/movies', {
        templateUrl: '/partials/movies.html',
        controller: 'movieCRUD'
      });
  }]);*/