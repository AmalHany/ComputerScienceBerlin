var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BusinessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Business', BusinessSchema);