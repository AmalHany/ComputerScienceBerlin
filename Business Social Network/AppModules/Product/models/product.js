var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
 
  Price: {
    type: Number,
    required: true
  }, 
  ProductDescription: {
     type: String,
     required: true
   },
   //image
   ProductURl: {
    type: String,
    
  },
  tags: {
    type: String,
    
  },
  RecLinks: {
    type: String,
  }

});

module.exports = mongoose.model('products', ProductSchema);

