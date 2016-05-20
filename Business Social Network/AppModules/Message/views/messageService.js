var MessageSocketService = angular.module('MessageSocketService', [])
.service('messageSocket', ['$rootScope', '$window', function ($rootScope, $window) {

  var messageSocket = {};
  messageSocket.socket = {};

  messageSocket.connect = function(){
    messageSocket.socket = io.connect('/chat', {
      query: 'token=' + $window.sessionStorage['mean-token']
    });
    messageSocket.socket.on('connect', function () {
      console.log("authorized");
    })
    .on('recMessage', function(newMsg) {
      $rootScope.$apply(function() {
        $rootScope.currentUser.inbox.push(newMsg);
        $rootScope.$emit('updateMessages');
      });
    })
    .on('disconnect', function () {
      console.log('disconnected');
    })
    .on('error', function(error) {
      if (error.type == 'UnauthorizedError' || error.code == 'invalid_token') {
        console.log("User's token is invalid");
      }
    });
  };

  messageSocket.sendMessage = function(msg){
    //expected msg object
    //msg.content; text in message
    //msg.from_business; id of sender's business
    //msg.to_business; id of receiver's business
    //msg.to_user; id of receiver
    messageSocket.socket.emit('sendMessage', msg);
  };

  return messageSocket;
}]);
