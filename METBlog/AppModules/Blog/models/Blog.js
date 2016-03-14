var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    required: true
  }
  posts:[
      {type: Schema.Types.ObjectId, ref: 'Post'}
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Blog', BlogSchema);
