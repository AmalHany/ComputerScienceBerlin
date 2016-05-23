 
var mongoose = require('mongoose');
var db = mongoose.connection;


var WishList= require('./../AppModules/WishList/models/WishList');
var Product= require('./../AppModules/Product/models/Product');
var Business= require('./../AppModules/Business/models/Business');



var p1 = new Product({name: "sa3a", price: "18"});
var p2 = new Product({name: "taba2", price: "180"});
var p3 = new Product({name: "ma3la2a", price: "1800"});
var p4 = new Product({name: "kobaya", price: "180"});
var p5 = new Product({name: "mastara", price: "18"});
var p6 = new Product({name: "shebak", price: "10"});

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

var b2 = new Business ({name :"Hazem",description:"a7la shopping",products:[p1._id,p2._id]});

b2.save(function (err) {
  if (err) {
    console.info("fail1");
  }
  else{
    console.info("success");
  }
});


// var w1 = new WishList({products:[p1._id,p2._id,p3._id,p4._id,p5._id,p6._id]}); //'.' for current direc '..' get back


// w1.save(function (err) {
//   if (err) {
//     console.log(err);
//     console.info("fail");
//   }
//   else{
//     console.info("success");
//   }
// });

mongoose.connect('mongodb://localhost/test_App');