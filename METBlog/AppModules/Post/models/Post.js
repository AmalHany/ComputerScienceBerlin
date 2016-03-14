var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new mongoose.Schena({
  text: String,
  date: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
  }
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  },
  comments:[CommentSchema]
);

module.exports = mongoose.model('Post', PostSchema);
