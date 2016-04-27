var mongoose = require('mongoose');

var CartSchema = new mongoose.Schema({
  ProductName: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('cart', CartSchema);

