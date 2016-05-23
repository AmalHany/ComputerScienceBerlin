var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new mongoose.Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  content:{type: String, required: true},
  date: {type: Date, default: Date.now}
});

var ProductSchema = new mongoose.Schema({
   name : {type: String, required: true},
   price : { type: Number,required: true },
   description : { type: String},
   tags : [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
   purchase_count : {type: Number, default: 0},
   reviews : [ReviewSchema],
   ratings : [{type: Number, min: 0, max: 10}],
   category : {type: Schema.Types.ObjectId, ref: 'ProductCategory'},
   business : {type: Schema.Types.ObjectId, ref: 'Business'},
   businessName:{type :String},
   images : [{type: String}]
});




var Product=module.exports = mongoose.model('Product', ProductSchema);
module.exports.getProductById = function(id, callback){
  Product.findById(id, callback);
}
module.exports.createProduct = function(newProduct, callback){
          newProduct.save(callback);

        };