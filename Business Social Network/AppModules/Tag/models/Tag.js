var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new mongoose.Schema({
   name : { type: String, required: true, unique: true, dropDups: true, lowercase: true }
});


module.exports = mongoose.model('Tag', TagSchema);
