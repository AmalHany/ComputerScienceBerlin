module.exports = function(app, route, express) {

  var io = app.socketIo.of('/chat');
  io.use(app.authSocket);
  io.on('connection', function(socket){

    app.models.User.findById(socket.decoded_token._id).exec(function(err, user){
      if(!err)
      {
        socket.join(user._id);

        socket.on("sendMessage", function(msg){
          var message = app.models.Message();
          message.content = msg.content;
          message.fromBusiness = msg.from_business;
          message.toBusiness = msg.to_business;
          message.fromUser = user._id;
          message.toUser = msg.to_user;
          message.save(function(err){
            if(err){
              console.log(err);
            }else{
              var notifyMsg = {
                _id: message._id,
                content: message.content,
                fromBusiness: message.fromBusiness,
                fromUser: message.fromUser,
                toBusiness: message.toBusiness,
                sent_at: message.sent_at,
                seen: message.seen
              };
              socket.broadcast.to(message.toUser).emit("recMessage", notifyMsg);
            }
          });
        });
      }
    });

  });

  // get all user messages as threads
  app.get('/messages/myMessages', app.auth, function(req, res){
    if (!req.user._id) {
      res.status(401).json({
        "message" : "UnauthorizedError: private profile"
      });
    }else{

    }
  });

  return function(req, res, next) {
      next();
  };
};
