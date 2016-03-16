var blogApp = angular.module('blogApp', []);

blogApp.controller('blogController',
  function($scope, $http, $routeParams) {
    $scope.getBlog = function(){
        var config = {
          method: "GET",
          url: '/blogs/' + $routeParams.blogId,
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.searchStr = "";
            $scope.blog = response.data;
        });
    }

    $scope.getBlog();
  }
);

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

var postApp = angular.module('postApp', []);

postApp.controller('postController', ['$routeParams',
  function($scope, $routeParams) {
    $scope.getPost = function(){
        var config = {
          method: "GET",
          url: "/posts",
          data: {post_id: $routeParams.postId},
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.post = response.data;
        });
    }

    $scope.getPost();
  }
]);
