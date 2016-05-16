var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new mongoose.Schema({
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




module.exports = mongoose.model('Product', ProductSchema);
