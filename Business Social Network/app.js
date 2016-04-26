var express = require('express');
//var mongoose = require('mongoose');
var mongo= require('./database.js');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var engines = require('consolidate');
var _ = require('lodash');

// Create the application.
var app = express();



// Choose module to parse html
app.engine('html', engines.hogan);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));


// Connect to MongoDB

mongo.connect(function(){
  mongo.clearDB(function(){
    mongo.seed(function(err,inserted){
      if(err){
        console.log("failed to insert in the database");
      }
          else{
            console.log("you have succesfully seeded the database")
         }


    })

  })

})

// mongoose.connect('mongodb://localhost/netapp');
// mongoose.connection.once('open', function() {

//   // Load the models.
//   app.models = require('./models_index');
//   // Load the routes.
//   var routes = require('./routes');

//   _.each(routes, function(controller, route) {
//     app.use(route, controller(app, route, express));
//   });


  app.get('/', function(req, res){
    app.set('views', 'public');
    res.render('index.html');
  });


app.get('/updateDB/:category', function(req, res){

  console.log(req.params.category);

   mongo.db().collection('myCollection').updateOne(
      { "fname" : "amal" },
      {
        $set: { "favourite_category_1" : req.params.category }
      }) 
      
})

  console.log('Listening on port 3000...');
  app.listen(3000);

//});
