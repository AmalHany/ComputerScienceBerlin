module.exports = function(app, route, express) {
  // i am using my model which is very similar to the one in devel just changed the requirements for testing 
	var Business = require('../models/business');
  //this is the method for the registration
 app.post('/registerBusiness', function(req, res){
  // taking in inputs from html page 
	var name = req.body.name;
  var category=req.body.category;
  var description=req.body.description;
  //validation for checking required fields
  req.checkBody('name', 'Name is required').notEmpty();
 //req.checkBody('category', 'Category is required').notEmpty();
 //checking validation
    var errors = req.validationErrors();
    //if errors then nothing basically happens 
  if(errors){
    console.log("errors");
    req.flash('success_msg', 'failed to register');
}else{    
  // this if success means no validation error 
  console.log("success");
  // new business is created
var newBusiness = new Business({
			owner:req.user,
        name: name,
        description:description,
        category:category,
			userid: req.user.id,
      approved:false
		});
// this is for saving the new buisiness in the database
Business.createBusiness(newBusiness, function(err, user){
			if(err) throw err;
      res.json('/');
		});
    req.flash('success_msg', 'You are now registered and waiting for admin approval');
}
  });
    return function(req, res, next) {
    next();
  };

};