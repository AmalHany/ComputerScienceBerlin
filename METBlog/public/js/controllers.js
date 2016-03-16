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
  function($scope,$http, $routeParams) {
    $scope.getPost = function(){
        var config = {
          method: "GET",
          url: "/posts/"+ $routeParams.postId,
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.post = response.data;
        });
    }

    $scope.getPost();
  }
]);

var userApp = angular.module('userApp', []);

userApp.controller('signUpController',
  function($scope, $http, $location) {

    $scope.newUser = {};

    $scope.addUser = function(){
      var config = {
        method: "POST",
        url: "/users/signup",
        data: {newUser: $scope.newUser},
        headers: {"Content-Type": "application/json;charset=utf-8"}
      };
      $http(config).then(function(response) {
        $location.path('/');
      });
    };

  }
);

userApp.controller('signInController',
  function($scope, $http, $location) {

    $scope.signUser = function(){
      var config = {
        method: "POST",
        url: "/users/signin",
        data: {user: $scope.user},
        headers: {"Content-Type": "application/json;charset=utf-8"}
      };
      $http(config).then(function(res) {

        if(res.data !== null)
        {
          $location.path('/');
        }
        else {
          $scope.error = "WRONG CREDENTIALS";
        }
      });
    };

  }
);
