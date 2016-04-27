var mongoose = require('mongoose');

var SignupSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  number: {
    type: String,
    //required: true
  },
  cat1: {
    type: String,
    //required: true
  },
  cat2: {
    type: String,
    //required: true
  },
  cat3: {
    type: String,
    //required: true
  }
});

module.exports = mongoose.model('signup', SignupSchema);

