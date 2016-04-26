module.exports = function(app, route, express) {



  app.get('/Product', function(req, res){
    app.models.Product.find({}, function(err, products) {
      if (err) throw err;
      res.json(products);
    });
  });

  return function(req, res, next) {
      next();
  };
};
