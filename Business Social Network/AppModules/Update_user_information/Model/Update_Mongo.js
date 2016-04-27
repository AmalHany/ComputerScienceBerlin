var mongoose = require('mongoose');
var Schema = new mongoose.Schema({
  name: {
  type: String,
  },
  phone: {
  type: String,
  },
  email: {
  type: String,
  },
  password: {
  type: String,
  },
  newpass: {
  type: String,
},
});
module.exports = mongoose.model('updateUserInfo', Schema);
