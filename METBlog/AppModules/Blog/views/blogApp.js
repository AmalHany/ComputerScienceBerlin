var blogApp = angular.module('blogApp', []);

blogApp.controller('blogController', ['$routeParams',
  function($scope, $routeParams, $http) {

    $scope.getBlog = function(){
        var config = {
          method: "GET",
          url: "/blogs",
          data: {blog_id: $routeParams.blogId},
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.blog = response.data;
        });
    }

    $scope.getBlog();
  }
]);
