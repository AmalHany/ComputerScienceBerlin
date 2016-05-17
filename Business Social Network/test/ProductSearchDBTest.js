var mongoose = require('mongoose');
var db = mongoose.connection;

var test1 = {
  name: "test1 bob",
  price: 200,
  seller: "H&M",
  review: "5 stars",
  tags: ["blue", "male", "jeans"]
};

var test2 = {
  name: "test car",
  price: 1200,
  seller: "Zara",
  review: "2 stars",
  tags: ["red", "female", "sweater"]
};

var allProducts = [test1, test2];
