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
