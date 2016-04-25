 
var mongoose = require('mongoose');
var db = mongoose.connection;


var WishList= require('./../AppModules/WishList/models/WishList');



var w1 = new WishList({products:[{Name: "ipod", Price: "18"},{Name: "iphone", Price: "180"},
{Name: "ipad", Price: "1800"},{Name: "kobaya", Price: "180"},{Name: "solly", Price: "18"},
{Name: "rita", Price: "10"}]}); //'.' for current direc '..' get back


w1.save(function (err) {
  if (err) {
    console.log(err);
    console.info("fail");
  }
  else{
    console.info("success");
  }
});

mongoose.connect('mongodb://localhost/test_App');