var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = new mongoose.Schema({
   product:  { type: Schema.Types.ObjectId, ref: 'Product' } ,
   user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
