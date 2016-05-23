module.exports = function(app, route, express) {

/////////////////////////////////////////////////////////////////

  app.get('/business', function(req, res){
    app.models.Business.find({}, function(err, businesses) {
      res.json(businesses);
    });
  });

  app.post('/business', function(req, res){
    var Name = req.body.name;
    //var Rate = req.body.Rating;
    

    var Business = new app.models.Business({
      name: Name,
     // Rating: Rate,
      
      
    });
    Business.save(function(err) {
      if (err) throw err;
    });
    res.sendStatus(200);
  });
  
 
app.get('/business/:business_id', function(req, res){
    app.models.Business.findOne({_id: req.params.business_id})
                   .populate('businesses products')
                   .exec(function(err, businesses) {
                     if (err) throw err;
                     res.json(businesses);
                   });
  });


////////////////////////////////////////////////////////

  return function(req, res, next) {
    next();
  };

};
