module.exports = function(app, route, express) {
	//get message
	app.get('/message', function(req, res){
    app.models.Message.find({}, function(err, message) {
      res.json(message);
    });
  });
	//send message 
	app.post('/message', function(req, res){
    var fromBusiness = req.body.fromBusiness;
    var toBusiness= req.body.toBusiness;
    var content= req.body.content;
     

    var newMessage = new app.models.Message({
      fromBusiness: fromBusiness,
      toBusiness: toBusiness,
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
