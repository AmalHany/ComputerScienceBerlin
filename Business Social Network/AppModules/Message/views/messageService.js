var MessageSocketService = angular.module('MessageSocketService', [])
.service('MessageSocket', ['$rootScope', '$window', function ($rootScope, $window) {

  var MessageSocket = {};
  MessageSocket.socket = {};

  MessageSocket.connect = function(){
    MessageSocket.socket = io.connect('/chat', {
      query: 'token=' + $window.sessionStorage['mean-token']
    });

    MessageSocket.socket.on('connect', function () {
      console.log("authorized");
    })
    .on('recMessage', function(newMsg) {
      $rootScope.$apply(function() {
        $rootScope.currentUser.inbox.push(newMsg);
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

  MessageSocket.recieveMessages = function(){
    MessageSocket.socket.on('recMessage', function(newMsg) {
      $rootScope.$apply(function() {
        $rootScope.currentUser.inbox.push(newMsg);
        console.log(newMsg);
      });
    })
  };

  MessageSocket.sendMessage = function(msg){
    //expected msg object
    //msg.content; text in message
    //msg.from_business; id of sender's business
    //msg.to_business; id of receiver's business
    //msg.to_user; id of receiver
    MessageSocket.socket.emit('sendMessage', msg);
  };

  return MessageSocket;
}]);
