var postApp = angular.module('postApp', []);

postApp.controller('postController', ['$routeParams',
  function($scope, $routeParams) {
    $scope.getPost = function(){
        var config = {
          method: "GET",
          url: "/posts",
      //    console.log(post.title);
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
