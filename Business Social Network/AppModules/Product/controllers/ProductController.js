module.exports = function(app, route, express) {

  //get all products
  app.get('/products', function(req, res){

    app.models.Product.find({})
    .populate('category' , 'name')
    .populate('tags', 'name').populate('seller', 'name').exec(function(err, products){

      if (err) throw err;

      //turn copy all the products and their properties
      //but category and tags are resolved to their respective names
      //instead of sending them to the client as objects

      products = products.map(function(a){

        var productToSend = {};
        productToSend.name = a.name;
        productToSend.price = a.price;
        productToSend.description = a.description;

        if(a.seller != undefined){
          productToSend.seller = a.seller.name;
        }

        if(a.tags != undefined){
          productToSend.tags = a.tags.map(function(b){
            return b.name;
          });
        }
        productToSend.purchase_count = a.purchase_count;
        productToSend.reviews = a.reviews;
        productToSend.ratings = a.ratings;

        if(a.category != undefined){
          productToSend.category = a.category.name;
        }

        productToSend.images = a.images;

        return productToSend;

      })
      res.json(products);
    });

  });

  return function(req, res, next) {
    next();
  };
};
