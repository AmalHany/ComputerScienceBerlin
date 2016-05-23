var mainApp = angular.module('mainApp', [ 'ngRoute','createBusinessApp']);
mainApp.config(['$routeProvider',
                  function($routeProvider) {
                    $routeProvider.
                        when('/', {
                          templateUrl: '/partials/CreateBusiness/toolbar.html',
                          controller: 'createBusinessCtrl'
                        });

                        $routeProvider.
                        when('/business', {
                          templateUrl: '/partials/CreateBusiness/businessregisteration.html',
                          controller: 'createBusinessCtrl'
                        });
                        $routeProvider.
                        when('/admin', {
                          templateUrl: '/partials/CreateBusiness/admin.html',
                          controller: 'createBusinessCtrl'
                        });
                         $routeProvider.
                        when('/show', {
                          templateUrl: '/partials/CreateBusiness/show.html',
                          controller: 'createBusinessCtrl'
                        });


                  }
               ]

);

