var mainApp = angular.module('mainApp', [ 'ngRoute', 'RateProductApp']);

mainApp.config(['$routeProvider',
        function($routeProvider) {

            $routeProvider.
            when('/rateProducts', {
                templateUrl: 'partials/Customers/RateProductView.html',
                controller: 'RateProductController'
            });
        }
    ]
);
