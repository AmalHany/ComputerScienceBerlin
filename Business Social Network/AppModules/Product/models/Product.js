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
   images : [{type: String}]
});




module.exports = mongoose.model('Product', ProductSchema);
