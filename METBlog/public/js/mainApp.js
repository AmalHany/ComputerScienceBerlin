  var mainApp = angular.module('mainApp', ['ngRoute', 'moviesApp']);

  mainApp.controller('aboutController', function($scope){});

  mainApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/partials/about.html',
        controller: 'aboutController'
      });
  }]);
