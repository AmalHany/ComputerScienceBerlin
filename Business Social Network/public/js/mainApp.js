var mainApp = angular.module('mainApp', [ 'ngRoute','cartApp']);
mainApp.config(['$routeProvider',
                  function($routeProvider) {
		$routeProvider.
		when('/ShoppingCart', {
        templateUrl: '/partials/ShoppingCart/cartView.html',
        controller: 'shopAdd'
      });

                  }]
);
