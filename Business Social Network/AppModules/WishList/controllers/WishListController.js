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
	
	return function(req, res, next) {
      next();
  };

};
