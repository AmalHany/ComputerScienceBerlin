var ProdreviewsApp = angular.module('businessrevcommApp', []);
  ProdreviewsApp.controller('reviewadd', function($scope, $http) {

     $scope.getBusinessRevRates = function(){
        var config = {
          method: "GET",
          url: "/businessrevcomm",
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.businessrevcomm = response.data;
        });
      }
  });