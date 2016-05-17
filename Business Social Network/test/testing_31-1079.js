 
var mongoose = require('mongoose');
var db = mongoose.connection;


var WishList= require('./../AppModules/WishList/models/WishList');
var Product= require('./../AppModules/Product/models/Product');



var p1 = new Product({Name: "sa3a", Price: "18"});
var p2 = new Product({Name: "taba2", Price: "180"});
var p3 = new Product({Name: "ma3la2a", Price: "1800"});
var p4 = new Product({Name: "kobaya", Price: "180"});
var p5 = new Product({Name: "mastara", Price: "18"});
var p6 = new Product({Name: "shebak", Price: "10"});

p1.save(function (err) {
  if (err) {
    console.info("fail1");
  }
  else{
    console.info("success");
  }
});

p2.save(function (err) {
  if (err) {
    console.info("fail2");
  }
  else{
    console.info("success");
  }
});

p3.save(function (err) {
  if (err) {
    console.info("fail3");
  }
  else{
    console.info("success");
  }
});


p4.save(function (err) {
  if (err) {
    console.info("fail1");
  }
  else{
    console.info("success");
  }
});

p5.save(function (err) {
  if (err) {
    console.info("fail2");
  }
  else{
    console.info("success");
  }
});

p6.save(function (err) {
  if (err) {
    console.info("fail3");
  }
  else{
    console.info("success");
  }
});



var w1 = new WishList({products:[p1._id,p2._id,p3._id,p4._id,p5._id,p6._id]}); //'.' for current direc '..' get back


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