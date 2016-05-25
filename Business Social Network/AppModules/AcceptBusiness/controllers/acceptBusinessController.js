module.exports = function(app, route, express) {
	var Business = require('../models/business');
  var User=app.models.user;
  

  app.post('/show', function(req, res){
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

    
    return function(req, res, next) {
    next();
  };

};
