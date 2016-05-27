var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  id: {
    type: String
  },
  report: {
    type: String
  }
});

module.exports = mongoose.model('sendReport', Schema);