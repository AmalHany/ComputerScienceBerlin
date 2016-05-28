module.exports = function(app, route, express) {

//get all product categories
  app.get('/productcategories', function(req, res){
    app.models.ProductCategory.find({}, function(err, productcategories){
      if (err) throw err;
      res.json(productcategories);
    });
  });


  return function(req, res, next) {
      next();
  };
};
