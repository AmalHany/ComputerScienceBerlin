var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('updateProductPrice', Schema);