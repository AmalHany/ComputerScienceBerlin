module.exports = function(app, route, express) {


app.get('/wishlists/:wishlist_id', function(req, res){

    app.models.WishList.findOne({_id: req.params.wishlist_id})  //fetching user's wishlist
                   .populate('products')
                   .exec(function(err, wishlists){
                     if (err) throw err;
                     var wishlist = {};
                     wishlist.newArr = [];
                     wishlist.flag = 0;                      //flag if something got updated in the wishlist's products
                     for(var i in wishlists.products){
                     if(wishlists.last_seen < (wishlists.products)[i].updatedAt)
                     wishlist.flag=1;
                   }
                      while(wishlists.products.length)       //inserting products 3 by 3 inorder to view them in a grid way
                        wishlist.newArr.push(wishlists.products.splice(0,3));

                     res.json(wishlist);    //returning JSON object containing both the flag and the products array
                   });

    app.models.WishList.findByIdAndUpdate(   //updating the last_seen of the wishlist to the current time
                     req.params.wishlist_id,
                       { last_seen: new Date().toISOString()},function(err,model){
                       if(err){
                         console.log(err);
                         return res.send(err);
                         }

                     });

  });
  app.put('/wishlists/:wishlist_id', function(req, res){    //checks if products have been changed inside the user's wishlist
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

  app.delete('/wishlists/:wishlist_id', function(req, res){  //removing product from a wishlist
  var ObjectId = require('mongoose').Types.ObjectId;
  var wishlist_id = req.body.wishlistID,
   product_id = req.body.productID;
  console.info(wishlist_id);
  app.models.WishList.findByIdAndUpdate(  //fetching the user's wishlist and removing a given product from it
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
