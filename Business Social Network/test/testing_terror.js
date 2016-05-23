 
var mongoose = require('mongoose');
var db = mongoose.connection;


var BusinessCategory= require('./../AppModules/BusinessCategory/models/BusinessCategory');
var Business= require('./../AppModules/Business/models/Business');


var b1 = new BusinessCategory({name:"Fashion"});
var b2 = new BusinessCategory({name:"Sport"});
var b3 = new BusinessCategory({name:"Perfumes"});



b1.save(function (err) {
  if (err) {
    console.info("fail00");
  }
  else{
    console.info("success");
  }
});
b2.save(function (err) {
  if (err) {
    console.info("fail00");
  }
  else{
    console.info("success");
  }
});
b3.save(function (err) {
  if (err) {
    console.info("fail00");
  }
  else{
    console.info("success");
  }
});



mongoose.connect('mongodb://localhost/test_App');