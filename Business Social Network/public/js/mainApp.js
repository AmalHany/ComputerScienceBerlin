
  var mainApp = angular.module('mainApp', [ 'ngRoute', 'socialDataApp']);

  mainApp.config(['$routeProvider',
                    function($routeProvider) {
                      $routeProvider.
                        when('/socialTest', {
                          templateUrl: '/partials/SocialNetworkInfo/testSocialNetwork.html',
                          controller: 'testController'
                        })
                    }
                  ]
  );

  
