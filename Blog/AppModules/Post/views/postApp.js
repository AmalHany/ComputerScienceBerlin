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
    // Roshdy

    // $scope.addComment = function(){
    //     if($scope.postText !== null
    //     && $scope.postText !== ""
    //     && $scope.postText !== undefined)
    //     {
    //       var config = {
    //         method: "POST",
    //         url: "/posts/:post_id/comments",
    //         data: {title: $scope.postText},
    //         headers: {"Content-Type": "application/json;charset=utf-8"}
    //       };
    //       $http(config).then(function(response) {
    //           $scope.getcomments();
    //           $scope.postText = null;
    //       });
    //      }
    //   }

    // end Roshdy


    // Samy

    // $scope.editComment = function(){

    //   var config ={

    //     method: "PUT",
    //     url:"/posts/:post_id/comments",
    //     data: {text: $scope.postText},
    //     headers: {"Content-Type": "application/json;charset=utf-8"}
          
    //   };
    //   $http(config).then(function(response) {
    //         $scope.getMovies();
    // });
    // }

    // End Samy

    $scope.getPost();
  }
]);
