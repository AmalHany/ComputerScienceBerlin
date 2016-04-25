module.exports = function(app, route, express) {

  //A get route for seach business by category. This function gets the category from the request, and finds all the business who has the same category.
  app.get('/searchBusiness', function(req, res, next){
  	var searchCategory = req.query.category;
  	app.models.Business.find({category: searchCategory}, function (err, business) {
  		if (err) {
  			next(err);
  		}
  		
  		res.json({business: business});
  	})
  });

  app.get('/newBusiness', function(req, res, next){
  	app.models.Business.create({name: "abc", category: "cafe"}, function (err, business) {
  		if (err) {
  			next(err);
  		}

  		res.json({business: business});
  	})
  });

  return function(req, res, next) {
      next();
  };
};
