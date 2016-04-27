var mongoose = require('mongoose');

var ProdRatesSchema = new mongoose.Schema({
  Rate: {
    type: Number,
    required: true
  }
});
module.exports = mongoose.model('productrates', ProdRatesSchema);