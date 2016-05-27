var mainApp = angular.module('mainApp', [ 'ngRoute','showReportsApp']);
mainApp.config(['$routeProvider',
                  function($routeProvider) {
                    $routeProvider.
                        when('/abod', {
                          templateUrl: '/partials/ShowReports/abod.html',
                          controller: 'showReportsCtrl'
                        });

                     


                  }
               ]

);

