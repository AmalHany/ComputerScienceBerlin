var mainApp = angular.module('mainApp', [ 'ngRoute','recommendationApp']);
mainApp.config(['$routeProvider',
                  function($routeProvider) {
                      $routeProvider
                      .when('/recommendation',{
                           templateUrl:'/partials/ViewRecommendations/recommendation.html',
                           controller:'recommendationCtrl'
                      });
                  }
               ]
);
