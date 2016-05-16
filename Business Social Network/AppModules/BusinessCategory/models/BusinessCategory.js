var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BusinessCategorySchema = new mongoose.Schema({
   name : { type: String, required: true, unique: true, dropDups: true }
});

module.exports = mongoose.model('BusinessCategory', BusinessCategorySchema);
