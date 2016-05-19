module.exports = function(app, route, express) {

  // send a message
  app.post('/sendMessage', function(req, res){

  });

  // get all user messages as threads
  app.get('/messages', function(req, res){

  });

  return function(req, res, next) {
      next();
  };
};
