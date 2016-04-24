  var mainApp = angular.module('mainApp', [ 'ngRoute', 'searchApp']);

  mainApp.config(['$routeProvider',
                    function($routeProvider) {

                      $routeProvider.

                      when('/search', {
                          templateUrl: '/partials/search/searchBox.html',
                          controller: 'SearchBoxController'
                        });

                    }
                  ]
  );
