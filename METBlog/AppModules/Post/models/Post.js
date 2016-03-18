var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new mongoose.Schema({
  text: String,
  date: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'    // removed required for testing
  }
});


var PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  },
  comments:[CommentSchema]
});

module.exports = mongoose.model('Post', PostSchema);
