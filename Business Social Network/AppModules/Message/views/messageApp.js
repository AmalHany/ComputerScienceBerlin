var messageApp = angular.module('messageApp', ['MessageSocketService']);

messageApp.controller('MessageController',[ '$scope', 'messageSocket', function($scope, messageSocket) {

  $scope.toUser = '';
  $scope.content = '';
  $scope.from_business = '';
  $scope.to_business = '';

  $scope.send = function(){
    messageSocket.sendMessage({
      toUser: $scope.toUser,
      content: $scope.content,
      from_business: $scope.from_business,
      to_business: $scope.to_business
    });
    $scope.toUser = '';
    $scope.content = '';
  };

}]);

messageApp.controller('MessageNotifyController',['$rootScope','$scope', function($rootScope, $scope) {
  $scope.newMessages = [];

  $rootScope.$on('updateMessages', function(){
    $scope.newMessages = [];
    $rootScope.currentUser.inbox.forEach(function(msg){
        if(!msg.seen)
          $scope.newMessages.push(msg);
    });
  });

}]);
