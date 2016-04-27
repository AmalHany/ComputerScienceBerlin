var mainApp = angular.module('mainApp', ['ngRoute','myApp']);
mainApp.config(['$routeProvider',
                  function($routeProvider) {
                  	$routeProvider.when('/updateProductPrice', {
                  		templateUrl : '/partials/updateProductPrice/index.html',
                  		controller : 'myCtrl'
                  	});
                  }]);
