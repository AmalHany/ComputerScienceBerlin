module.exports = function(app, route, express) {

  app.get('/businessrevrate', function(req, res){
    app.models.BusinessRevRate.find({}, function(err, businessrevrate) {
      res.json(businessrevrate);
    });
  });

  return function(req, res, next) {
    next();
  };

};
