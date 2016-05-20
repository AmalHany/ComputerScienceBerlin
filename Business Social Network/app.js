var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var engines = require('consolidate');
var _ = require('lodash');
var sugar = require("sugar")
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('express-jwt');

// Create the application.
var app = express();
var server = require('http').createServer(app);

// Load the models.
app.models = require('./models_index');
// Load the routes.
var routes = require('./routes');

// authentication configuration
passport.use(new LocalStrategy({ usernameField: 'email' }, function(username, password, done) {
    app.models.User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));

// add authentication layer to middleware stack
app.use(passport.initialize());
app.auth = jwt({
  secret: process.env.MYSECRET,
  userProperty: 'user'
});

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

  _.each(routes, function(controller, route) {
    app.use(route, controller(app, route, express));
  });

  app.get('/', function(req, res){
    app.set('views', 'public');
    res.render('index.html');
  });

  // handle UnauthorizedError
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
  });

  console.log('Listening on port 3000...');

  server.listen(3000);
});
