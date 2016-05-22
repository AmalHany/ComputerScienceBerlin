var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//attributes of messageSchema
var MessageSchema = new mongoose.Schema({
   sent_at: { type: Date, default: Date.now },
   content: { type: String, required: true },
   subject: { type: String},
   fromBusiness: { type: String, required: true },
   toBusiness: { type: String, required: true },
});

module.exports = mongoose.model('Message', MessageSchema);
