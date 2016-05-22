var mongoose = require ('mongoose'); //This our mongoose call like in the server.js

module.exports = mongoose.model ('User', {
	email : String,
	password: String,
	firstName : String,
	lastName : String,
	age : String,
	Gender : String
});


// this is the structure schema for our database