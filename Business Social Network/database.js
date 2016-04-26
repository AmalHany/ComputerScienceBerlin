var mongo = require('mongodb').MongoClient;

var customers =require('./customers.json');

//console.log(customers[0].adress);



var DB = null;          
var dbURL = 'mongodb://localhost:27017/OmarDb';

exports.connect = function(cb) 
{ 
 mongo.connect(dbURL, function (err,db) 
 {
     DB = db;
     cb();
 });
};

exports.db = function() 
{
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

var clearDB=function(done) 
{
 console.log("Cleared DB");
    DB.listCollections().toArray().then(function (collections) 
    {
        collections.forEach(function (c) 
        {
            DB.collection(c.name).removeMany();
        });
        done();
    }).catch(done);
};

exports.clearDB = clearDB;

exports.seed=function(cb){

	DB.collection('myCollection').insertMany(customers,function(err,inserted){

		cb(err,inserted);

	})



}