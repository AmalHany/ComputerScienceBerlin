var mongoose = require('mongoose');

var ProdReviewSchema = new mongoose.Schema({
  Text: {
    type: String,
    required: true
  }

 // User: {
 // 	type: String
  //}


 
  

});

module.exports = mongoose.model('productreviews', ProdReviewSchema);

