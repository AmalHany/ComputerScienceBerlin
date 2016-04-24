<<<<<<< HEAD
  var mainApp = angular.module('mainApp', [ 'ngRoute','productApp']);
  
  mainApp.config(['$routeProvider',
                    function($routeProvider) {
                    	$routeProvider.
                        when('/Product', {
                          templateUrl: '/partials/Product/product.html',
                          controller: 'addingProduct'
                        });
=======
var mainApp = angular.module('mainApp', [ 'ngRoute']);
mainApp.config(['$routeProvider',
                  function($routeProvider) {
>>>>>>> 86c20d8976f99f925471c0162ba9fff9ee0d8eaa

                  }
               ]
);
