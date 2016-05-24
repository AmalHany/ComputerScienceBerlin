var createBusinessApp = angular.module('createBusinessApp', []);
  createBusinessApp.controller('createBusinessCtrl', function($scope,$location,$http,$routeParams) {
    //this is called from html passing a post for the controller 
            $scope.createbusiness=function(){
        var config = {
            method: "POST",
            url: "/registerBusiness",
//this data part is for req.field for obtaining inputs
             data: {name:$scope.name,
                    category:$scope.category,
                    description:$scope.description
                   },
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
          // on success redirect to homepage again
             $http(config).then(function(response) {
$location.path(response.data);
        }); 
    }
  });