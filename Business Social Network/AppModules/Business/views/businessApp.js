var businessApp = angular.module('businessApp', []);

businessApp.controller('searchController',
  function($scope, $http, $routeParams) {
    
    $scope.searchByCategory = function(category){
        var config = {
          method: "GET",
          url: 'searchBusiness',
          params: {'category': category},
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.businesses = response.data.business;
            $scope.searchString = "";
        });
    }
  }
);

