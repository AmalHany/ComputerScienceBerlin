module.exports = function(app, route, express) {
	app.get('/businessCategories/:business_id', function(req, res){
		app.models.BusinessCategory.find({}, function(err, categories) {
			if(err) throw err;
			res.json(categories);
		});
  });

     app.post('/businessCategories',function(req,res){
     	var ObjectId = require('mongoose').Types.ObjectId;
      app.models.Business.findByIdAndUpdate(
     req.data.business_id,{ 'category' : new ObjectId(req.data.category_id)} , function(err,model){
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
