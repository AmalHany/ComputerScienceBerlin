module.exports = function(app, route, express) {

  
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