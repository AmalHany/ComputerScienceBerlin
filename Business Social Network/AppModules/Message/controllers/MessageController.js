module.exports = function(app, route, express) {
	//to get all messages
	app.get('/message', function(req, res){
    app.models.Message.find({}, function(err, message) {
      res.json(message);
    });
  });
	//to send new message
	app.post('/message', function(req, res){
    var fromBusiness = req.body.fromBusiness;
    var toBusiness= req.body.toBusiness;
    var content= req.body.content;
    var newMessage = new app.models.Message({
      fromBusiness: fromBusiness,
      toBusiness: toBusiness,
      content:content      
    });
    newMessage.save(function(err) {
      if (err) throw err;
    });
    res.sendStatus(200);
  });
	//to delete a message with the id
	app.delete('/message', function(req, res){
    app.models.Message.remove({ _id: req.body.messageID }, function (err) {
        if(!err)
        {
          res.sendStatus(200);
        }
    });
  });

  return function(req, res, next) {
      next();
  };
};
