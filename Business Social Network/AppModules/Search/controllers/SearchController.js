module.exports = function(app) {

//get all products
  app.get('/search/:category/:searchTerm', function(req, res){
    app.models.Product.find({}, function(err, products){
      if (err) throw err;
      res.json(products);
      console.log("sdfsdf")
    });
  });

  return function(req, res, next) {
    next();
  };
};
