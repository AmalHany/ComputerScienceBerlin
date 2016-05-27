var mainApp = angular.module('mainApp', ['ngRoute','myApp']);
mainApp.config(['$routeProvider',
                  function($routeProvider) {
                  	$routeProvider.when('/sendReport', {
                  		templateUrl : '/partials/SendReport/index.html',
                  		controller : 'myCtrl'
                  	});
                  }]);
