var mongoose = require('mongoose');
var Schema = mongoose.Schema;






var WishListSchema = new mongoose.Schema({
 
	// user: {
	// 	type : Schema.Types.ObjectId,        //Waiting for User Model -.-
	// 	ref: 'User' 
	// }


	products : [{ type: Schema.Types.ObjectId, ref: 'Product' }]



 });




module.exports = mongoose.model('WishList', WishListSchema);

