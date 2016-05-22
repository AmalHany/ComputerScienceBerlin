var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ReportSchema = new mongoose.Schema({
  name:{type:String,  required:  true },
  description:{type: String  },
  UserToReport:{type: String}
});

models.export= mongoose.model('Report',ReportSchema);
