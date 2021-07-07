var homeApp = angular.module('homeApp', []);

homeApp.controller('homeController',
  function($scope, $http) {
    $scope.getBlogs = function(){
        var config = {
          method: "GET",
          url: "/blogs",
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.blogs = response.data;
        });
      }

    $scope.getBlogs();
  }
);
