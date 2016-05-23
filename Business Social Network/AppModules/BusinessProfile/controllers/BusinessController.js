module.exports = function(app, route, express) {

  app.get('/business', function(req, res){                            //getting all Businesses
    app.models.Business.find({}, function(err, businesses) {
      res.json(businesses);
    });
  });

  app.post('/business', function(req, res){
    var Name = req.body.name;
    var Business = new app.models.Business({
      name: Name,
    });
    Business.save(function(err) {
      if (err) throw err;
    });
    res.sendStatus(200);
  });
  
app.get('/business/:business_id', function(req, res){               // getting business by id from all businesses
    app.models.Business.findOne({_id: req.params.business_id})
                   .populate('businesses products reviews')
                   .exec(function(err, businesses) {
                     if (err) throw err;
                     res.json(businesses);
                   });
  });

  return function(req, res, next) {
    next();
  };

};
