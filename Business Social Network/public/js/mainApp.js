  var mainApp = angular.module('mainApp', [ 'ngRoute','productApp']);
  
  mainApp.config(['$routeProvider',
                    function($routeProvider) {
                    	$routeProvider.
                        when('/Product', {
                          templateUrl: '/partials/Product/product.html',
                          controller: 'addingProduct'
                        });

                    }
                  ]
  );
