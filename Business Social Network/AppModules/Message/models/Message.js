var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
   sent_at: Date,
   content: String,
   title: String,
   fromBusiness: Boolean,
   toBusiness: Boolean,
   fromUser: { type: Schema.Types.ObjectId, ref: 'User' },
   toUser: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Message', MessageSchema);
