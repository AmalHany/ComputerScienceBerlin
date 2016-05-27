var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var TransactionSchema=new mongoose.Schema({
	date:{type: Date, default:Date.now},
	product:{type:Schema.Types.ObjectId,ref:'Product',required:true },
	user:{type: Schema.Types.ObjectId,ref:'User',required:true}
});
module.exports= mongoose.model('Transaction', TransactionSchema);

module.exports.createTransaction = function(t, callback){
	        t.save(callback);

	    	}