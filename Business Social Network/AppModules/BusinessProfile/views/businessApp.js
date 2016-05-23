var BusinessApp = angular.module('businessApp', []);

  BusinessApp.controller('view', function($scope, $http) {                //Getting ALl businesses
     $scope.getBusiness = function(){
        var config = {
          method: "GET",
          url: "/business",
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.businesses = response.data;
        });
      }

      $scope.addBusiness = function(){
        if($scope.Name !== null && $scope.Name!== "" && $scope.Rate !== null
        && $scope.Rate !== "") 
        {                                                                 // Adding Bussines for trail
          var config = {
            method: "POST",
            url: "/business",
            data: {name: $scope.Name},
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
          $http(config).then(function(response) {
              $scope.getBusiness();
              $scope.Name = null;
              $scope.Rate = null;
    
          });
         }
      }
      $scope.getBusiness();
    }
    );

      BusinessApp.controller('businessProfileController',function($scope, $http, $routeParams) {        //getting Business from all Businesses
      $scope.getBusinessDetails = function(){
        var config = {
          method: "GET",
          url: '/business/'+ $routeParams.businessId,
         // data: {business_id: $routeParams.businessId},
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.searchStr = "";
            $scope.business = response.data;
        });
    }
      $scope.getBusinessDetails();
  }
  );