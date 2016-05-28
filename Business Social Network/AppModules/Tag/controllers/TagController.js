module.exports = function(app, route, express) {

  //get all tags
  app.get('/tags', function(req, res){
    app.models.Tag.find({}, function(err, tags){
      if (err) throw err;
      res.json(tags);
    });
  });

  return function(req, res, next) {
      next();
  };
};
