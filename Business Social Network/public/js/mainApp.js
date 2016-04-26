var mainApp = angular.module('mainApp', [ 'ngRoute']);

mainApp.config(function($routeProvider,$locationProvider) {
    $routeProvider

        .when('/', {
            templateUrl : '/Partials/Categories.html',
            controller  : 'categoryCtrl'
        })
});
