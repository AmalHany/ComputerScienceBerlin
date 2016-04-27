var mainApp = angular.module('mainApp', [ 'ngRoute','productApp']);
mainApp.config(['$routeProvider',
                  function($routeProvider) {
                    $routeProvider.when('/makeOffer', {
      templateUrl: '/partials/Product/product.html',
      controller: 'ProductController'
    });
                  }
               ]
);
