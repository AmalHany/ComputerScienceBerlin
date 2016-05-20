var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
   sent_at: { type: Date, default: Date.now },
   content: { type: String, required: true },
   seen: { type: Boolean, default: false },
   fromBusiness: { type: String, required: true },
   toBusiness: { type: String, required: true },
   // fromUser: { type: Schema.Types.ObjectId, ref: 'User', requried: true },
   // toUser: { type: Schema.Types.ObjectId, ref: 'User', requried: true }
});

module.exports = mongoose.model('Message', MessageSchema);
