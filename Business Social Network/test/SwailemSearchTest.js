var mongoose = require('mongoose');
var db = mongoose.connection;

var Product = require('./../AppModules/Product/models/Product');
var Tag = require('./../AppModules/Tag/models/Tag');
var ProductCategory = require('./../AppModules/ProductCategory/models/ProductCategory');

Product.remove({});
Tag.remove({})
ProductCategory.remove({})

var tag1 = new Tag({name: 'blue'});
var tag2 = new Tag({name: 'car'});
var tag3 = new Tag({name: 'black'});
var tag4 = new Tag({name: 'green'})

tag1.save();
tag2.save();
tag3.save();

var p1 = new ProductCategory({name: 'clothes'});
var p2 = new ProductCategory({name: 'electronics'});
var p3 = new ProductCategory({name: 'cars'});
var p4 = new ProductCategory({name: 'food'});

p1.save();
p2.save();
p3.save();
p4.save();

var t1 = new Product(
  {
    name: 'swailem ga3an lesa', price: 200, ratings: 2, category:p1._id, tags: [tag1._id,tag3._id],}
);
// var t1 = new Product({name: 't', price: 200, ratings, 2, tags: tag1._id, category: p1._id});
// var t2 = new Product({name: 't car', price: 1200,  ratings, 4, tags: tag2._id, category: p2._id});
// var t3 = new Product({name: 'swailem gedan', price: 1200,  ratings, 3, tags: tag3._id, category: p3._id});
// var t4 = new Product({name: 'el gaw 7ar enahrda', price: 110,  ratings, 1, tags: [tag1._id,tag3._id], category: p4._id});


t1.save();
// t1.save();
// t2.save();
// t3.save();
// t4.save();




mongoose.connect('mongodb://localhost/test_App');
