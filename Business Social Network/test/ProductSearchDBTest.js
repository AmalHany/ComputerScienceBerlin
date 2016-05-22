var mongoose = require('mongoose');
var db = mongoose.connection;

var Product = require('./../AppModules/Product/models/Product');

var test1 = new Product({
  name: "test1 bob",
  price: 200
});

var test2 = new Product({
    name: "test car",
    price: 1200
});

test1.save(function (err) {
  if (err) {
    console.info("fail1");
  }
  else{
    console.info("success");
  }
});

test2.save(function (err) {
  if (err) {
    console.info("fail1");
  }
  else{
    console.info("success");
  }
});

Product.find({}, function(err, products) {
  if (err) throw err;

  // object of all the products
  console.log(products);
});


mongoose.connect('mongodb://localhost/test_App');
