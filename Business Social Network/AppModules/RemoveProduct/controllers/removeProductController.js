module.exports = function(app, route, express) {
  var Business = app.models.Business;
  var Product=app.models.Product;
  var User=app.models.user;
  //this is a method from sprint 1 to add products for testing 
   app.post('/addtocart', function(req, res){
    if(typeof req.user.cart!=='undefined'){
var x=app.models.User.db.collection('users'); // exporting the collection to apply findandModify()
var arry=[];
req.user.cart.push(req.body.productid);//adding the product into the cart of the user in session
arry=req.user.cart;
//finding the user in session in the data base and modifing his cart 
x.findAndModify(
  {_id: req.user._id}, // query
  [],  // sort order
  {$set: {cart: arry}}, // replacement, replaces only the field "hi"
  {}, // options
  function(err, object) {
      if (err){
          console.warn(err.message);  // returns error if no matching object found
      }else{
          console.dir(object);
      }
  });
// returning all products that was found with in the ids given in his cart
Product.find({
    '_id': { $in: req.user.cart}
}, function(err, docs){
     res.json(docs);
});
}
});
// this is where i remove the product
app.post('/removefromcart', function(req, res){
    if(typeof req.user.cart!=='undefined'){
                var x=app.models.User.db.collection('users');
      var arry=[];
  // finidng the required product throught looping on the cart in the session
  for(var k = 0; k<req.user.cart.length; k++){
           if(req.user.cart[k]==req.body.productid){
            req.user.cart.splice(k,1);//this is for removing at index k and only need to remove 1 object which is my desired product 
            k=1000000;// for exiting the loop at once
}
arry=req.user.cart;
//finding the user in database and refreshing his cart
x.findAndModify(
  {_id: req.user._id}, // query
  [],  // sort order
  {$set: {cart: arry}}, // replacement, replaces only the field "hi"
  {}, // options
  function(err, object) {
      if (err){
          console.warn(err.message);  // returns error if no matching object found
      }else{
          console.dir(object);
      }
  });

      }
      //returning array of refreshed cart products
      Product.find({
    '_id': { $in: req.user.cart}
}, function(err, docs){
     res.json(docs);
});
}
});
//this is a method from another issue for showing products of subscribed businesses on my wall
  app.get('/getmyproducts', function(req, res){
    var arry=[];
    var arry2=[];
    var x=app.models.Business.db.collection('businesses');
        var z=app.models.Product.db.collection('products');
    x.find().toArray(function(err,items){
     for(var i = 0; i<items.length; i++){ 
      if (typeof items[i].followers !== 'undefined') {
        for(var j = 0; j<items[i].followers.length; j++){
          var id=JSON.stringify(req.user._id);
          var follower=JSON.stringify(items[i].followers[j]);
      if(follower===id){
         for(var k = 0; k<items[i].products.length; k++){
           arry.push(items[i].products[k]);
      }
    }
}
}
}
          Product.find({
    '_id': { $in: arry}
}, function(err, docs){
     res.json(docs);
});
       });
});
// this is a helper method for returning  the cart of the user in the database to make the cart in html dynamic no need to refresh
app.post('/getuser', function(req, res){
                  var x=app.models.User.db.collection('users');
  x.find().toArray(function(err,items){
    // looping through all users to find the one in session in the database
      for(var i = 0; i<items.length; i++){
      if(items[i]._id==req.user._id)
        res.json(items[i].cart);//returning his cart
     }
  });

   res.json(req.user.cart);
});
    return function(req, res, next) {
    next();
  };

};
