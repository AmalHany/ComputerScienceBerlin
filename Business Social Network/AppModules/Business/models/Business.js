var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BusinessSchema = new mongoose.Schema({
   name: { type: String, required: true },
   description: {type: String},
   start_date: {type: Date, default: Date.now},
   reviews: [{type:String}],
   ratings: [{type:Number}],
   products: [ { type: Schema.Types.ObjectId, ref: 'Product' } ],
   category: {type: Schema.Types.ObjectId, ref: 'BusinessCategory', required: true},
   followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
   owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Business', BusinessSchema);
