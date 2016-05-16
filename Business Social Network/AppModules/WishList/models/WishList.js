var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var WishListSchema = new mongoose.Schema({
	products : [ { type: Schema.Types.ObjectId, ref: 'Product' } ],
	last_seen: Date
 });

module.exports = mongoose.model('WishList', WishListSchema);
