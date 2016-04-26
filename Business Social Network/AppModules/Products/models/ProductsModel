var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema;
ProductSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        required: true
    },
    ProductURl: {
        type: String,
        required: true
    },
    ProductDescription: {
        type: String,
        required: true
    },
    ProductPrice: {
        type: Double,
        required: true
    },
    tags: {
        type: String

    },
    RecLinks: {
        type: String
    },
    Category:{
        type: String
    },
    Rating: {
        type: [Number]
    },
    Business:{
        type: String
    }
});
module.exports = mongoose.model('Product',Schema);