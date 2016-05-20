module.exports = function(app, route, express) {

  var io = app.socketIo.of('/chat');
  io.use(app.authSocket);
  io.on('connection', function(socket){

    app.models.User.findById(socket.decoded_token._id).exec(function(err, user){
      if(!err)
      {
        socket.on("sendMessage", function(msg){

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
