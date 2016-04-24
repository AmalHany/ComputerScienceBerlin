var mainApp = angular.module('mainApp', [ 'ngRoute', 'businessApp']);
mainApp.config(['$routeProvider',
                  function($routeProvider) {
                  	$routeProvider.when('/business', {
                  		templateUrl: 'partials/Business/business.html',
                  		controller: 'searchController'
                  	})
                  }
               ]
);
