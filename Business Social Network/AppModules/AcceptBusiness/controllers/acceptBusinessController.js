module.exports = function(app, route, express) {
	var Business = require('../models/business');
  var User=app.models.user;
  
//showing all businesses with option to accept
  app.post('/show', function(req, res){
    var x=app.models.Business.db.collection('businesses');
    x.find().toArray(function(err,items){
      res.json(items);
       });
});
  //this is for showing accepted businessses
  app.get('/show2', function(req, res){

    var arry=[];
    var x=app.models.Business.db.collection('businesses');
    x.find().toArray(function(err,items){
    for(var i = 0; i<items.length; i++){
      if(items[i].approved==true)
        arry.push(items[i])
     }
      res.json(arry);

       });

});
// this is for getting user name to ensure admins login
    app.get('/getuser', function(req, res){

   res.json(req.user.username);
});
// accepting business altering approved attribute to true in database 
   app.post('/accept', function(req, res){
    var x=app.models.Business.db.collection('businesses');
    var y=app.models.Business;
    var business_id=req.body.businessID;
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
   followers: foundbusiness.followers,
   owner: foundbusiness.owner,
   approved :true
    },
   {
     upsert: false,
     multi: false
   }
);
    });
    x.find().toArray(function(err,items){
      res.json(items);

       });

});


    
    return function(req, res, next) {
    next();
  };

};
