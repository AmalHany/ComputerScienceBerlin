var mainApp = angular.module('mainApp', [ 'ngRoute','prodreviewApp']);
mainApp.config(['$routeProvider',
                  function($routeProvider) {
		$routeProvider.
		when('/prodreviews', {
        templateUrl: '/partials/ProdReview/prodreview.html',
        controller: 'reviewadd'
      });

                  }]
);
