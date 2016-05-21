module.exports = function(app, route, express) {

  // handle realtime socket namespace chat
  var io = app.socketIo.of('/chat');
  io.use(app.authSocket);
  io.on('connection', function(socket){

    app.models.User.findById(socket.decoded_token._id).exec(function(err, user){
      if(!err)
      {
        // add socket to special root with user id
        socket.join(user._id);
        // when user sends a message through realtime API
        socket.on("sendMessage", function(msg){
          var ObjectId = require('mongoose').Types.ObjectId;
          var message = app.models.Message();
          message.content = msg.content;
          //message.fromBusiness = new ObjectId(msg.fromBusiness);
          //message.toBusiness = new ObjectId(msg.toBusiness);
          message.fromUser = new ObjectId(user._id);
          message.toUser = new ObjectId(msg.toUser);
          // save message to database
          message.save(function(err){
            if(err){
              console.log(err);
            }else{
              // broadcast the message to the receiver's socket room
              socket.broadcast.to(msg.toUser).emit("recMessage", message);
            }
          });
        });
      }
    });

  });

  // get all received user messages dummy route for testing
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
