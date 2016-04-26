module.exports = function(app, route, express) {

/////////////////////////////////////////////////////////////////

  app.get('/products', function(req, res){
    app.models.Product.find({}, function(err, products) {
      res.json(products);
    });
  });

  app.post('/products', function(req, res){
    var productTitle = req.body.Name;
    var productPrice = req.body.Price;
    var ProductDescription= req.body.ProductDescription;
    var tags= req.body.tags;
     

    var newProduct = new app.models.Product({
      Name: productTitle,
      Price: productPrice,
      ProductDescription:ProductDescription,
      tags:tags,
      
    });
    newProduct.save(function(err) {
      if (err) throw err;
    });
    res.sendStatus(200);
  });
  app.delete('/products', function(req, res){
    app.models.Product.remove({ _id: req.body.productID }, function (err) {
        if(!err)
        {
          res.sendStatus(200);
        }
    });
  });




////////////////////////////////////////////////////////

  return function(req, res, next) {
    next();
  };

};
