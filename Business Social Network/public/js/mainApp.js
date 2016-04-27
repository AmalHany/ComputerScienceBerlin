var mainApp = angular.module('mainApp', [ 'ngRoute','reviewApp']);
mainApp.config(['$routeProvider',
                  function($routeProvider) {
		$routeProvider.
		when('/reviews', {
        templateUrl: '/partials/Review/review.html',
        controller: 'reviewPost'
      });

                  }]
);
