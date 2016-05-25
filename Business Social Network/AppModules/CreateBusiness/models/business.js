var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ReviewSchema = new mongoose.Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  content:{type: String, required: true},
  date: {type: Date, default: Date.now}
});
//this is similar to the  business model but without the category restricitions
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
//this is for saving business in database 
module.exports.createBusiness = function(newBusiness, callback){
	        newBusiness.save(callback);
	    	}
// returning a business by quering name
module.exports.getBusinessByUsername = function(username, callback){
	var query = {username: username};
	Business.findOne(query, callback);
}
// returning a business by quering id
module.exports.getBusinessById = function(id, callback){
	Business.findById(id, callback);
}
//trial method for returning all
module.exports.findAll = function(req,res){
  console.log("Retrieving all the links");
  mongoose.collection('businesses',function(err,collection){
    collecction.find().toArray(function(err,items){
      res.send(items);

    });
  });
};
