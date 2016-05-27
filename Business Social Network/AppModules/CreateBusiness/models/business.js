var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new mongoose.Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  content:{type: String, required: true},
  date: {type: Date, default: Date.now}
});

var BusinessSchema = new mongoose.Schema({
   name: { type: String, required: true },
   description: {type: String},
   start_date: {type: Date, default: Date.now},
   reviews: [ReviewSchema],
   ratings : [{type: Number, min: 0, max: 10}],
   products: [ { type: Schema.Types.ObjectId, ref: 'Product' } ],
   //category: {type: Schema.Types.ObjectId, ref: 'BusinessCategory', required: true},
   followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
   owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   approved :{type: Boolean}
});

var Business=module.exports = mongoose.model('Business', BusinessSchema);

module.exports.createBusiness = function(newBusiness, callback){
	        newBusiness.save(callback);

	    	}

module.exports.getBusinessByUsername = function(username, callback){
	var query = {username: username};
	Business.findOne(query, callback);
}

module.exports.getBusinessById = function(id, callback){
	Business.findById(id, callback);
}
module.exports.findAll = function(req,res){
  console.log("Retrieving all the links");
  mongoose.collection('businesses',function(err,collection){
    collecction.find().toArray(function(err,items){
      res.send(items);

    });
  });
};

// module.exports.comparePassword = function(candidatePassword, hash, callback){
// 	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
//     	if(err) throw err;
//     	callback(null, isMatch);
// 	});
