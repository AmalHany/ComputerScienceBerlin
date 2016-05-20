var messageApp = angular.module('messageApp', ['MessageSocketService']);

messageApp.controller('MessageController',['$rootScope', '$window', '$http', '$scope', 'messageSocket', function($rootScope, $window, $http, $scope, messageSocket) {

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

// messageApp.controller('MessageController',['$rootScope', '$window', '$http', '$scope', 'messageSocket', function($rootScope, $window, $http, $scope, messageSocket) {
//
//   $scope.toUser = '';
//   $scope.content = '';
//   $scope.from_business = '';
//   $scope.to_business = '';
//
//   $scope.send = function(){
//     messageSocket.sendMessage({
//       toUser: $scope.toUser,
//       content: $scope.content,
//       from_business: $scope.from_business,
//       to_business: $scope.to_business
//     });
//     $scope.toUser = '';
//     $scope.content = '';
//   };
//
// }]);
