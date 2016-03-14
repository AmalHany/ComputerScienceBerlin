var postApp = angular.module('postApp', []);

postApp.controller('postController', ['$routeParams',
  function($scope, $routeParams) {
    $scope.postId = $routeParams.postId;
  }
]);
