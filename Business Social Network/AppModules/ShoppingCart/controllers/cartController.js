module.exports = function(app, route, express) {

  app.get('/ShoppingCart', function(req, res){
    app.models.ShoppingCart.find({}, function(err, products) {
      res.json(products);
    });
  });

  app.post('/ShoppingCart', function(req, res){
    var productName = req.body.productName;
    

    var Product2Cart = new app.models.Review({
      productName: productName
    });
    Product2Cart.save(function(err) {
      if (err) throw err;
    });
    res.sendStatus(200);
  });
 

  return function(req, res, next) {
    next();
  };

};
