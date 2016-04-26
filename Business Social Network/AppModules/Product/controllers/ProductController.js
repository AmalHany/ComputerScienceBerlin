module.exports = function(app, route, express) {



  app.get('/Product', function(req, res){
    app.models.Product.find({}, function(err, products) {
      if (err) throw err;
      res.json(products);
    });
  });

  app.post('/makeOffer',function(req,res){
      var productTitle = req.body.Name;
      var productPrice = req.body.Price;
      var ProductDescription = req.body.ProductDescription;
      var tags = req.body.tags;

      var newOffer = new app.models.Product({
        Name : productTitle,
        Price:productPrice,
        ProductDescription: ProductDescription,
        tags: tags,

      });
      newOffer.save(function(err){
        if (err) throw err;

      });
      res.send(200);
  });

  return function(req, res, next) {
      next();
  };
};
