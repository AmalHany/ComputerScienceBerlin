module.exports = function(app, route, express) {
	var Business = require('../models/business');
  var Product=app.models.Product;
  var User=app.models.user;
  var Transaction =app.models.Transaction;


//amr
 app.post('/registerBusiness', function(req, res){
	var name = req.body.name;
  var category=req.body.category;
  var description=req.body.description;
  req.checkBody('name', 'Name is required').notEmpty();
 //req.checkBody('category', 'Category is required').notEmpty();
    var errors = req.validationErrors();
  if(errors){
    console.log("errors");
    req.flash('success_msg', 'failed to register');
}else{    
  console.log("success");
 // console.log(JSON.stringify(name));  
var newBusiness = new Business({
			owner:req.user,
        name: name,
        description:description,
        category:category,
			userid: req.user.id,
      approved:false
		});
Business.createBusiness(newBusiness, function(err, user){
			if(err) throw err;
			//console.log(newBusiness);
      res.json('/');
		});
    req.flash('success_msg', 'You are now registered and waiting for admin approval');
}
  });
 //amr


 //kareem
  app.get('/show', function(req, res){
    //console.log(app);
    var x=app.models.Business.db.collection('businesses');
    x.find().toArray(function(err,items){
     // console.log(JSON.stringify(items));
      res.json(items);
       });
//   app.models.Business.db.collection.find().toArray(function (err, docs) {
//     console.log(JSON.stringify(docs));
// });
});
   app.post('/accept', function(req, res){
    //console.log(app);
    var x=app.models.Business.db.collection('businesses');
    var y=app.models.Business;
    var business_id=req.body.businessID;
   // console.log(business_id);
    y.getBusinessById(business_id,function(err,foundbusiness){
      if(err)return err;
      x.update(
   {_id:foundbusiness._id},
  {
  name: foundbusiness.name,
   description: foundbusiness.description,
   start_date: foundbusiness.start_date,
   reviews: foundbusiness.reviews,
   ratings : foundbusiness.ratings,
   products: foundbusiness.products,
  // category: {type: Schema.Types.ObjectId, ref: 'BusinessCategory', required: true},
   followers: foundbusiness.followers,
   owner: foundbusiness.owner,
   approved :true
    },
   {
     upsert: false,
     multi: false
   }
);
//console.log(foundbusiness);
    });
   // foundbusiness.approved=true;
    x.find().toArray(function(err,items){
      //console.log(JSON.stringify(items));
      res.json(items);

       });
//   app.models.Business.db.collection.find().toArray(function (err, docs) {
//     console.log(JSON.stringify(docs));
// });
});
//kareem

//hana
   app.post('/checkout', function(req, res){
    if(typeof req.user.cart!=='undefined'){
          var x=app.models.User.db.collection('users');
          for(var k=0;k<req.user.cart.length;k++){
            var t= new Transaction({
              product:req.user.cart[k],
              user:req.user._id
            });
            Transaction.createTransaction(t, function(err){
      if(err) throw err;
    }); 
          }
          req.user.cart.splice(0,10000);
var arry=[];
arry=req.user.cart;

//req.user.cart.push(req.body.productid);
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
    //  console.log(req.user.cart);

Product.find({
    '_id': { $in: req.user.cart}
}, function(err, docs){
   //console.log(docs);
     res.json(docs);
});
//res.json(req.body.user);
}
//   app.models.Business.db.collection.find().toArray(function (err, docs) {
//     console.log(JSON.stringify(docs));
// });
});
   //hana


   //bench old
   app.post('/addtocart', function(req, res){
    if(typeof req.user.cart!=='undefined'){
          var x=app.models.User.db.collection('users');
var arry=[];
req.user.cart.push(req.body.productid);
arry=req.user.cart;
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
    //  console.log(req.user.cart);

Product.find({
    '_id': { $in: req.user.cart}
}, function(err, docs){
   //console.log(docs);
     res.json(docs);
});
//res.json(req.body.user);
}
//   app.models.Business.db.collection.find().toArray(function (err, docs) {
//     console.log(JSON.stringify(docs));
// });
});
//bench old


//hazem
app.post('/removefromcart', function(req, res){
    if(typeof req.user.cart!=='undefined'){
                var x=app.models.User.db.collection('users');
    //  console.log(req.user.cart);
      var arry=[];
  for(var k = 0; k<req.user.cart.length; k++){
           if(req.user.cart[k]==req.body.productid){
            req.user.cart.splice(k,1);  
            k=1000000;
}
console.log(req.user.cart);
arry=req.user.cart;
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
      Product.find({
    '_id': { $in: req.user.cart}
}, function(err, docs){
   //  console.log(docs);
     res.json(docs);
});
//res.json(req.body.user);
}
//   app.models.Business.db.collection.find().toArray(function (err, docs) {
//     console.log(JSON.stringify(docs));
// });
});
//hazem


//bench new
  app.get('/getmyproducts', function(req, res){
    var arry=[];
    var arry2=[];
    //console.log(app);
    var x=app.models.Business.db.collection('businesses');
        var z=app.models.Product.db.collection('products');

    x.find().toArray(function(err,items){

    // console.log(JSON.stringify(items));
     for(var i = 0; i<items.length; i++){ 
     // console.log("here");
      //console.log(items[i].products);
      if (typeof items[i].followers !== 'undefined') {
        for(var j = 0; j<items[i].followers.length; j++){
      //console.log(typeof items[i].followers[j]);
           // console.log(typeof req.user._id);
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
   //  console.log(docs);
     res.json(docs);
});
         // console.log(productarray);
         //    res.json(productarray);

     
   
   
     
   
  // console.log(arry);

       });
//   app.models.Business.db.collection.find().toArray(function (err, docs) {
//     console.log(JSON.stringify(docs));
// });

});
  //bench new
  app.get('/show2', function(req, res){

    //console.log(app);
    var arry=[];
    var x=app.models.Business.db.collection('businesses');
    x.find().toArray(function(err,items){
     // console.log(JSON.stringify(items));
    for(var i = 0; i<items.length; i++){
      if(items[i].approved==true)
        arry.push(items[i])
     }
      res.json(arry);

       });
//   app.models.Business.db.collection.find().toArray(function (err, docs) {
//     console.log(JSON.stringify(docs));
// });
});
  //bench new


// helper method for all
app.post('/getuser', function(req, res){
                  var x=app.models.User.db.collection('users');
  x.find().toArray(function(err,items){
      for(var i = 0; i<items.length; i++){
      if(items[i]._id==req.user._id)
        res.json(items[i].cart);
     }
  });

   res.json(req.user.cart);
});

//bench new
            app.post('/subscribe', function(req, res){
    //console.log(app);
    var x=app.models.Business.db.collection('businesses');
    var y=app.models.Business;
    //console.log(y);
    var business_id=req.body.businessID;
   // console.log(business_id);
    y.getBusinessById(business_id,function(err,foundbusiness){
      if(err)return err;
      var arry=[];
       for(var i = 0; i<foundbusiness.followers.length; i++){
        arry.push(foundbusiness.followers[i]);
     }
     arry.push(req.user);
foundbusiness.followers.push(req.user);
      x.update(
   {_id:foundbusiness._id},
  {
  name: foundbusiness.name,
   description: foundbusiness.description,
   start_date: foundbusiness.start_date,
   reviews: foundbusiness.reviews,
   ratings : foundbusiness.ratings,
   products: foundbusiness.products,
  // category: {type: Schema.Types.ObjectId, ref: 'BusinessCategory', required: true},
   followers: foundbusiness.followers,
   owner: foundbusiness.owner,
   approved :foundbusiness.approved
 },
   {
     upsert: false,
     multi: false
   }
);
    });
  });
            //bench new


    //helper method for adding dummy products for test
              app.post('/test', function(req, res){
                var Products=[];
 var product1=new Product({
  name:"product1",
  price:25
});
 var product2=new Product({
  name:"product2",
  price:250
});
Product.createProduct(product1, function(err, user){
      if(err) throw err;
    }); 
Product.createProduct(product2, function(err, user){
      if(err) throw err;
    }); 
//Products.push(product1);
//console.log(Products);
    //console.log(app);
    var x=app.models.Business.db.collection('businesses');
    var y=app.models.Business;
    //console.log(y);
    var business_id=req.body.businessID;
   // console.log(business_id);
    y.getBusinessById(business_id,function(err,foundbusiness){
      if(err)return err;
     //  var arry=[];
     //   for(var i = 0; i<foundbusiness.followers.length; i++){
     //    arry.push(foundbusiness.followers[i]);
     // }
     // arry.push(req.user);
     product1.businessName=foundbusiness.name;
     Products.push(product1);
      for(var i = 0; i<Products.length; i++){
      foundbusiness.products.push(Products[i]);
     }
   //  console.log(foundbusiness.products);
 x.update(
   {_id:foundbusiness._id},
  {

  name: foundbusiness.name,
   description: foundbusiness.description,
   start_date: foundbusiness.start_date,
   reviews: foundbusiness.reviews,
   ratings : foundbusiness.ratings,
   products: foundbusiness.products,
  // category: {type: Schema.Types.ObjectId, ref: 'BusinessCategory', required: true},
   followers: foundbusiness.followers,
   owner: foundbusiness.owner,
   approved :foundbusiness.approved


    },
   {
     upsert: false,
     multi: false
   }
)  ;   // console.log(Products);
    });
  });
            //

            //abod
              app.get('/showreports', function(req, res){
    //console.log(app);
    var x=app.models.Business.db.collection('reports');
    x.find().toArray(function(err,items){
     // console.log(JSON.stringify(items));
      res.json(items);
       });
//   app.models.Business.db.collection.find().toArray(function (err, docs) {
//     console.log(JSON.stringify(docs));
// });
});
              //abod


    return function(req, res, next) {
    next();
  };

};