var postApp = angular.module('postApp', []);

postApp.controller('postController',
  function($scope, $http,$routeParams) {
    $scope.getPost = function(){
        var config = {
          method: "GET",
          url: "/posts/" + $routeParams.postId,
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {

            $scope.post = response.data;

        });
        //console.log($routeParams.postId);
    }

    $scope.removeComment = function(x){
        var config = {
          method: "DELETE",
          url: "/posts/" + $routeParams.postId,
          data: {commentID: x._id , postID: $routeParams.postId},
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.getPost();
        });
      }


      $scope.addComment = function(x){
        var config = {
          method: "POST",
          url: "/posts/" + $routeParams.postId,
          data: {ctext: $scope.commTxt , postID: $routeParams.postId},
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.getPost();
            $scope.commTxt="";
        });
      }


      $scope.editComment = function(x){
        var config = {
          method: "DELETE",
          url: "/posts/" + $routeParams.postId,
          data: {commentID: x._id , postID: $routeParams.postId},
          headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        $http(config).then(function(response) {
            $scope.getPost();
            $scope.commTxt= x.text;
        });
      }




    $scope.getPost();
  }
);
