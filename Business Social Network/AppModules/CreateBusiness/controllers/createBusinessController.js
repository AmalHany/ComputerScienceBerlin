module.exports = function(app, route, express) {
	var Business = require('../models/business');
  var Product=app.models.Product;
 



 app.post('/x', function(req, res){
	var name = req.body.name;
 // console.log(JSON.stringify(name));  
var newBusiness = new Business({
			owner:req.user,
        name: name,
			userid: req.user.id,
      approved:false
		
		});
Business.createBusiness(newBusiness, function(err, user){
			if(err) throw err;
			//console.log(newBusiness);
      res.json(newBusiness.name);

		});
// newArray = [];
// //while(Admin.businesses.length) 
// 	newArray.push(newBusiness);
// console.info(newArray[0]);
// Admin.addnewbusiness(newBusiness);
// console.info(Admin.businesses[0]);
// //res.render('admin');
// //res.render('/admin', { name: newBusiness.name });
// a
  });
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
   app.post('/addtocart/:cart', function(req, res){
    if(typeof req.body.cart!=='undefined'){


var arry=req.body.cart;
console.log(arry.length);

}
var prod_id=req.body.productid;
console.log(req.body.productid);
    Product.getProductById(req.body.productid,function(err,foundproduct){
      if(err)return err;
      res.json(foundproduct);
    });
//   app.models.Business.db.collection.find().toArray(function (err, docs) {
//     console.log(JSON.stringify(docs));
// });
});
   app.get('/getmyproducts', function(req, res){
    var arry=[];
    var arry2=[];
    //console.log(app);
    var x=app.models.Business.db.collection('businesses');
        var z=app.models.Product.db.collection('products');

    x.find().toArray(function(err,items){

    // console.log(JSON.stringify(items));
     for(var i = 0; i<items.length; i++){ 
      console.log("here");
      console.log(items[i].products);
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

          Product.find({
    '_id': { $in: arry}
}, function(err, docs){
     console.log(docs);
     res.json(docs);
});
         // console.log(productarray);
         //    res.json(productarray);

     }
   }
   
     }
   }
   console.log(arry);

       });
//   app.models.Business.db.collection.find().toArray(function (err, docs) {
//     console.log(JSON.stringify(docs));
// });
});
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
    app.get('/showmyproducts', function(req, res){

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



    app.get('/getuser', function(req, res){

   res.json(req.user.username);
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
)

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
)

     //console.log(foundbusiness.followers);
    });
  });
              app.post('/test', function(req, res){
                var Products=[];
 var product1=new Product({
  name:"product1",
  price:25
});
 
Product.createProduct(product1, function(err, user){
      if(err) throw err;
      //console.log(newBusiness);
      //res.json(newBusiness.name);

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
)     // console.log(Products);
    });
  });

    return function(req, res, next) {
    next();
  };

};