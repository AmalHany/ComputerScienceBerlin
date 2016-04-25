module.exports = function(app, route, express) {


app.get('/wishlists/:wishlist_id', function(req, res){

    app.models.WishList.findOne({_id: req.params.wishlist_id})
                   .exec(function(err, wishlists){
                     if (err) throw err;
                     var newArr = [];
                      while(wishlists.products.length) 
                        newArr.push(wishlists.products.splice(0,3));
                     res.json(newArr);
                   });
  });



  app.delete('/wishlists/:wishlist_id', function(req, res){
    
  var wishlist_id = req.body.wishlistID,
   product_id = req.body.productID;
  console.info(product_id);
  app.models.WishList.findByIdAndUpdate(
    wishlist_id,
   { $pull: { 'products': {  _id: product_id } } },function(err,model){
      if(err){
        console.log(err);
        return res.send(err);
        }
        return res.json(model);
    });


});
	
	return function(req, res, next) {
      next();
  };

};
