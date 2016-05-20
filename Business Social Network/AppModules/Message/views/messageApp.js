var messageApp = angular.module('messageApp', ['MessageSocketService']);

messageApp.controller('MessageController',['$rootScope', '$window', '$http', '$scope', 'MessageSocket', function($rootScope, $window, $http, $scope, MessageSocket) {

  $scope.toUser = '';
  $scope.content = '';
  $scope.from_business = '';
  $scope.to_business = '';

  $scope.send = function(){
    MessageSocket.sendMessage({
      toUser: $scope.toUser,
      content: $scope.content,
      from_business: $scope.from_business,
      to_business: $scope.to_business
    });
    $scope.toUser = '';
    $scope.content = '';
  };

}]);
