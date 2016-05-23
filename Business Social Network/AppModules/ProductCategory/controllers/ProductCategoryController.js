module.exports = function(app, route, express) {
	app.get('/productCategories/:product_id', function(req, res){
		app.models.ProductCategory.find({}, function(err, categories) {
			if(err) throw err;
			res.json(categories);
		});
  });

     app.post('/productCategories',function(req,res){
     	var ObjectId = require('mongoose').Types.ObjectId;
      app.models.Product.findByIdAndUpdate(
     req.data.product_id,{ 'category' : new ObjectId(req.data.category_id)} , function(err,model){
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
