var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
   email: { type: String, unique: true, required: true},
   hash: String,
   salt: String,
   first_name: { type: String, required: true },
   last_name: { type: String, required: true },
   date_of_birth: { type: Date, required: true },
   about: { type: String },
   image_path: { type: String },
   gender: { type: String, required: true, enum: ['male', 'female']},
   myBusinesses: [{ type: Schema.Types.ObjectId, ref: 'Business' }],
   followingBusinesses: [{ type: Schema.Types.ObjectId, ref: 'Business' }],
   followingUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
   followers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

UserSchema.methods.getFullName = function(){
  return this.first_name + " " + this.last_name;
};

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.getFullName(),
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.MYSECRET);
};

module.exports = mongoose.model('User', UserSchema);
