var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductCategorySchema = new mongoose.Schema({
   name : { type: String, required: true, unique: true, dropDups: true },
   parent: { type: Schema.Types.ObjectId, ref: 'ProductCategory', default: null }
});

module.exports = mongoose.model('ProductCategory', ProductCategorySchema);
