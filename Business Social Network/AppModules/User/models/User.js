var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
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

module.exports = mongoose.model('User', UserSchema);
