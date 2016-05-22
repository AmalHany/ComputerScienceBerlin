var mongoose = require('mongoose');
var db = mongoose.connection;
var Product = require('./../AppModules/Product/models/Product');

Product.find({}, function(err, products) {
  if (err) throw err;

  // object of all the products
  console.log(products);
});

mongoose.connect('mongodb://localhost/test_App');
  
