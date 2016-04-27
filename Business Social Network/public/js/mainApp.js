var mainApp = angular.module('mainApp', ['ngRoute','myApp']);

  mainApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/updateCompanyInfo', {
        templateUrl: '/partials/update_company_info/index.html',
        controller: 'myCtrl'
      });
  }]);
