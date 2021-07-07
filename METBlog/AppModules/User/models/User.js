var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  f_name: {
    type: String,
    required: true
  },
  l_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  blogs:[
      {type: Schema.Types.ObjectId, ref: 'Blog'}
  ]
});

module.exports = mongoose.model('User', UserSchema);
