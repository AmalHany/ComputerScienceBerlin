var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var methodOverride = require('method-override');
var engines = require('consolidate');
var exphbs = require('express-hogan');
var _ = require('lodash');
//var users = require('./AppModules/Login/Controllers/users');
// Create the application.
var app = express();
//app.set('view engine', 'handlebars');
// Choose module to parse html
app.set('view engine', 'html');
app.set('views', 'public');
app.enable ('view cache');
app.engine ('html', require('hogan-express'));


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});



// Connect to MongoDB
mongoose.connect('mongodb://localhost/netapp');
mongoose.connection.once('open', function() {

  // Load the models.
  app.models = require('./models_index');
  //Load the routes.
var routes = require('./routes');

  _.each(routes, function(controller, route) {
    app.use(route, controller(app, route, express));
  });
//app.use('/users', users);

  app.get('/', function(req, res){
    app.set('views', 'public');
    res.render('index.html');
  });
  
  app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
  console.log('Server started on port '+app.get('port'));
});
});
