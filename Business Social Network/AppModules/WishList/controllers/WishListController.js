module.exports = function(app, route, express) {


app.get('/wishlists/:wishlist_id', function(req, res){

    app.models.WishList.findOne({_id: req.params.wishlist_id})
                   .populate('products')
                   .exec(function(err, wishlists){
                     if (err) throw err;
                     var wishlist = {};
                     wishlist.newArr = [];
                     wishlist.flag = 0;
                     for(var i in wishlists.products){
                     if(wishlists.last_seen < (wishlists.products)[i].updatedAt)
                     wishlist.flag=1;
                   }

                      while(wishlists.products.length)
                        wishlist.newArr.push(wishlists.products.splice(0,3));

                     res.json(wishlist);
                   });

    app.models.WishList.findByIdAndUpdate(
                     req.params.wishlist_id,
                       { last_seen: new Date().toISOString()},function(err,model){
                       if(err){
                         console.log(err);
                         return res.send(err);
                         }
                         //return res.json(model);
                     });

  });
  app.put('/wishlists/:wishlist_id', function(req, res){
    app.models.WishList.findOne({_id: req.params.wishlist_id})
                   .populate('products')
                   .exec(function(err, wishlists){
                     if (err) throw err;
                     var wishlist = {};
                     wishlist.newArr = [];
                     wishlist.flag = 0;
                     for(var i in wishlists.products){
                     if(wishlists.last_seen < (wishlists.products)[i].updatedAt)
                     wishlist.flag=1;
                   }

                      while(wishlists.products.length)
                        wishlist.newArr.push(wishlists.products.splice(0,3));

                     res.json(wishlist);
                   });


    });



  app.delete('/wishlists/:wishlist_id', function(req, res){
  var ObjectId = require('mongoose').Types.ObjectId;
  var wishlist_id = req.body.wishlistID,
   product_id = req.body.productID;
  console.info(wishlist_id);
  app.models.WishList.findByIdAndUpdate(
    wishlist_id,
   { $pull: { 'products': new ObjectId(product_id) } },function(err,model){
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
