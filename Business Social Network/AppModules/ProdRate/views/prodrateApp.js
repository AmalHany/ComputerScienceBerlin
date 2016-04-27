var ProdratesApp = angular.module('prodrateApp', []);

  ProdratesApp.controller('rateadd', function($scope, $http) {

     $scope.getProdRates = function(){
        var config = {
          method: "GET",
          url: "/prodrates",
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.productrates = response.data;
        });
      }

      $scope.addProdRates = function() {

          if ($scope.RateName !== null && $scope.RateName !== "") {
              var config = {
                  method: "POST",
                  url: "/prodrates",
                  data: {Rate: $scope.RateName},
                  headers: {"Content-Type": "application/json;charset=utf-8"}
              };
              $http(config).then(function (response) {
                  $scope.getProdRates();
                  $scope.RateName = null;
              });
          }
      }
       $scope.getProdRates();
      
  });