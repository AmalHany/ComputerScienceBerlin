var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductTestSchema = new mongoose.Schema({
   Name: {
    type: String,
    required: true
  },
   Price: {
    type: Number,
    required: true
  },
  url: String

});





var WishListSchema = new mongoose.Schema({
 
	// user: {
	// 	type : Schema.Types.ObjectId,        //Waiting for User Model -.-
	// 	ref: 'User' 
	// }


	products : [ProductTestSchema]



 });




module.exports = mongoose.model('WishList', WishListSchema);
