var blogApp = angular.module('blogApp', []);

blogApp.controller('blogController',
  function($scope, $http, $routeParams, $location) {
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
        //console.log($routeParams.blogId);
    }





     $scope.addPost = function(){
      console.log($scope.PostName);
        if($scope.PostName !== null
        && $scope.PostName !== ""
        && $scope.PostName !== undefined)
        {
          
          var config = {
            method: "POST",
            url: "/blogs/" + $routeParams.blogId,
            data: {title: $scope.PostName, content:"first sd post", date:"1995-23-1",blog:$routeParams.blogId},
            headers: {"Content-Type": "application/json;charset=utf-8"}
          };
          $http(config).then(function(response) {       
              $scope.PostName = "";
              $location.path( "/blog/" + $routeParams.blogId);
          });
         }
      }


        $scope.removePost = function(x){
        var config = {
          method: "DELETE",
          url: "/blogs/" +$routeParams.blogId ,
          data: {postID: x._id},
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.getBlog();
        });
      }

      
      $scope.editPost = function(x){
        var config = {
          method: "PUT",
          url: "/blogs/" +$routeParams.blogId ,
          data: {postID: x._id, b_id: x.blog},
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.getBlog();
            $scope.PostName = x.content;
        });
      }








    $scope.getBlog();
  }
);
