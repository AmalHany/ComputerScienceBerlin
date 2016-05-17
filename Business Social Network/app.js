var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var engines = require('consolidate');
var _ = require('lodash');
var sugar = require("sugar")

// Create the application.
var app = express();
var server = require('http').createServer(app);

// Create realtime socket interface
app.socketIo = require('socket.io').listen(server);
app.socketIo.on('connection', function (socket) {
});

// Choose module to parse html
app.engine('html', engines.hogan);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));


// Connect to MongoDB
mongoose.connect('mongodb://localhost/test_App');
mongoose.connection.once('open', function() {

  // Load the models.
  app.models = require('./models_index');
  // Load the routes.
  var routes = require('./routes');

  _.each(routes, function(controller, route) {
    app.use(route, controller(app, route, express));
  });

  app.get('/', function(req, res){
    app.set('views', 'public');
    res.render('index.html');
  });

  console.log('Listening on port 3000...');

  server.listen(3000);
});
