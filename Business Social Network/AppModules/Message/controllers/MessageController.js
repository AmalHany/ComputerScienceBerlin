module.exports = function(app, route, express) {

	app.get('/message', function(req, res){
    app.models.Message.find({}, function(err, message) {
      res.json(message);
    });
  });

	app.post('/message', function(req, res){
    var fromm = req.body.fromBusiness;
    var to = req.body.toBusiness;
    var content= req.body.content;
     

    var newMessage = new app.models.Message({
      fromBusiness: fromm,
      toBusiness: to,
      content:content      
    });
    //save the new message
    newMessage.save(function(err) {
      if (err) throw err;
    });
    res.sendStatus(200);
  });



  return function(req, res, next) {
      next();
  };
};
