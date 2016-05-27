var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var ReportSchema = new mongoose.Schema({
   username : {type: String, required: true},
   description : { type: String, required: true},
   user_id : {type: Schema.Types.ObjectId, ref: 'User'},

});




var Report=module.exports = mongoose.model('Report', ReportSchema);
module.exports.getReportbyID = function(id, callback){
  Report.findById(id, callback);
}
module.exports.createReport = function(newReport, callback){
          newReport.save(callback);

        };