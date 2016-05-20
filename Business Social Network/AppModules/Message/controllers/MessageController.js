module.exports = function(app, route, express) {

  var io = app.socketIo.of('/chat');
  io.use(app.authSocket);
  io.on('connection', function(socket){

    app.models.User.findById(socket.decoded_token._id).exec(function(err, user){
      if(!err)
      {
        socket.join(user._id);
        socket.on("sendMessage", function(msg){
          var ObjectId = require('mongoose').Types.ObjectId;
          var message = app.models.Message();
          message.content = msg.content;
          //message.fromBusiness = new ObjectId(msg.fromBusiness);
          //message.toBusiness = new ObjectId(msg.toBusiness);
          message.fromUser = new ObjectId(user._id);
          message.toUser = new ObjectId(msg.toUser);
          message.save(function(err){
            if(err){
              console.log(err);
            }else{
              socket.broadcast.to(msg.toUser).emit("recMessage", message);
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
      app.models.Message.find({toUser: req.user._id}, function(err, messages){
        if(!err)
        {
          res.json(messages);
        }
      });
    }
  });

  return function(req, res, next) {
      next();
  };
};
