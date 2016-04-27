var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  Review: {
    type: String,
    required: true
  },
 
  Dates: {
    type: Number,
    required: true
  }
 

});

module.exports = mongoose.model('reviews', ReviewSchema);

