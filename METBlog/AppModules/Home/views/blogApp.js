var blogApp = angular.module('blogApp', []);

blogApp.controller('blogController', ['$routeParams',
  function($scope, $routeParams, $http) {
    $scope.blogId = $routeParams.blogId;
  }
]);
