var User = require('../models/signup');

module.exports.create= function (req, res) { 	
	var user = new User(req.body); 
	user.save(function (err, result){ 
	res.json(result);
		
	});
}
//The  method  returns the collection
  module.exports.list = function (req, res) { 
  User.find({}, function (err, results) {
    res.json(results);
  });
}


