var mainApp = angular.module('mainApp', [ 'ngRoute','prodrateApp']);
mainApp.config(['$routeProvider',
                  function($routeProvider) {
		$routeProvider.
		when('/prodrates', {
        templateUrl: '/partials/ProdRate/prodrate.html',
        controller: 'rateadd'
      });
                  }]
);
