var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var path =require('path');

var User = require('../Models/user');

// Register
router.get('/register', function(req, res){
	res.render('partials/Login/register');
});

// Login
router.get('/login', function(req, res){
// db.user.find().toArray(function (err, docs) {
//     console.log(JSON.stringify(docs));
// });
     	res.render(path.join('', 'partials/Login/login'));
});

// Register User
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
    console.log(req.body.username);

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
//
	var errors = req.validationErrors();

	if(errors){
		
		req.flash('success_msg', 'failed to register');

		res.redirect('/users/register');
		
	} else {
		var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.use(new FacebookStrategy({
clientID: process.env.APPID,
    clientSecret: process.env.APPSECRET,
    callbackURL: "http://localhost:3000/users/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function(){
          User.findOne({'facebook.id': profile.id}, function(err, user){
                          console.log(profile.email);

            if(err){
              return done(err);
                                                      console.log('notuser');

            }
            if(user){
              return done(null, user);
                                        console.log('user');

            }
            else {
                                                      console.log('registersuser');

              var newUser = new User();
              newUser.facebook.id = profile.id;
              newUser.facebook.token = accessToken;
              newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
              newUser.facebook.email = profile.emails[0].value;
              console.log(newUser);

              newUser.save(function(err){
                if(err)
                  throw err;
                return done(null, newUser);
              })
            }

          });
        });
      }

  ));
 


passport.serializeUser(function(user, done) {
 done(null, user.id);
   // done(null, user.username);

});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
  var arry=[];
  User.db.collection('users').findAndModify(
  {_id: req.user._id}, // query
  [],  // sort order
  {$set: {cart: arry}}, // replacement, replaces only the field "hi"
  {}, // options
  function(err, object) {
      if (err){
          console.warn(err.message);  // returns error if no matching object found
      }else{
          console.dir(object);
      }
  });
 // req.user.cart.splice(0,req.user.cart.length);
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});
  router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

router.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { successRedirect: '/users/profile',
                                        failureRedirect: '/users/login' }));



router.get('/profile', isLoggedIn, function(req, res){
      res.render(path.join('', 'partials/Login/profile'), { user: req.user });
  });
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }

  res.redirect('/users/login');
}

module.exports = router;