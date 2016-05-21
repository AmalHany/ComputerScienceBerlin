var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var engines = require('consolidate');
var _ = require('lodash');
var sugar = require("sugar")
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var jwt = require('express-jwt');
var socketioJwt = require('socketio-jwt');

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
// facebook authentication

passport.use(new FacebookStrategy({
    clientID: process.env.APPID,
    clientSecret: process.env.APPSECRET,
    callbackURL: '/users/login/facebook/callback' },
    function(token, refreshToken, profile, done) {
      process.nextTick(function() {
        app.models.User.findOne({ 'facebook.id': profile.id }, function(err, user) {
          if (err)
            return done(err);
          if (user) {
            return done(null, user);
          } else {
            var newUser = new app.models.User();
            newUser.facebook.id = profile.id;
            newUser.facebook.token = token;
            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
            newUser.facebook.email = profile.id +"@facebook";//(profile.emails[0].value || '').toLowerCase();
            newUser.first_name = profile.displayName.split(" ")[0];
            newUser.last_name = profile.displayName.split(" ")[1];
            newUser.email = profile.id +"@facebook";//(profile.emails[0].value || '').toLowerCase();
            newUser.date_of_birth = "01/07/1995";
            newUser.gender = "female";//profile.gender;

            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });
    })
);

// add authentication layer to middleware stack
app.use(passport.initialize());
// decode javascript object token and check if its correct before protected express routes
app.auth = jwt({
  secret: process.env.MYSECRET,
  userProperty: 'user'
});

// Create realtime socket interface
app.socketIo = require('socket.io').listen(server);
// decode javascript object token and check if its correct before protected realtime socket namespaces
app.authSocket = socketioJwt.authorize({
  secret: process.env.MYSECRET,
  handshake: true
});

// Choose module to parse html
app.engine('html', engines.hogan);

// request format middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// add asset directory to api paths
app.use(express.static(__dirname + '/public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/test_App');
mongoose.connection.once('open', function() {

  // add all controllers as middleware in express
  _.each(routes, function(controller, route) {
    app.use(route, controller(app, route, express));
  });

  // send angular application and templates
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
