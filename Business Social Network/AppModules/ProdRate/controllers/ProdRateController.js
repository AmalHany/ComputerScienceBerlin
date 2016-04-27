module.exports = function(app, route, express) {


  app.get('/prodrates', function(req, res){
    app.models.ProdRate.find({}, function(err, rates) {
      res.json(rates);
    });
  });
  app.post('/prodrates', function(req, res){
    var Rate = req.body.Rate;
    var newRate = new app.models.ProdRate({
    Rate: Rate
    });
    newRate.save(function(err) {
      if (err) throw err;
    });
    res.sendStatus(200);
  });
  
 


  return function(req, res, next) {
    next();
  };

};
