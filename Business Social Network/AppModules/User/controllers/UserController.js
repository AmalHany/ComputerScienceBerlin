module.exports = function(app, route, express) {

  var passport = require('passport');

  // register as a new user
  app.post('/users/register', function(req, res){
    var user = new app.models.User();

    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.date_of_birth = req.body.date_of_birth;
    user.gender = req.body.gender;

    // set password hash in database
    user.setPassword(req.body.password);

    // save user
    user.save(function(err) {
      if(err){
        console.log(err);
      }else{
        var token;
        // generate json web token for session management
        token = user.generateJwt();
        res.status(200);
        // send json web token to client
        res.json({
          "token" : token
        });
      }
    });
  });

  // login as a new user
  app.post('/users/login', function(req, res){
    passport.authenticate('local', function(err, user, info){
      var token;
      // If Passport throws/catches an error
      if (err) {
        res.status(404).json(err);
        return;
      }
      // If a user is found
      if(user){
        // generate json web token for session management
        token = user.generateJwt();
        res.status(200);
        // send json web token to client
        res.json({
          "token" : token
        });
      } else {
        // If user is not found
        res.status(401).json(info);
      }
    })(req, res);
  });

  // login as a new user
  app.get('/users/login/facebook',
    passport.authenticate( 'facebook', { session: false, scope: ['email'] })
  );

  app.get('/users/login/facebook/callback', function(req, res){
    passport.authenticate('facebook', function(err, user, info){
      if(user)
      {
        var token;
          token = user.generateJwt();
          res.status(200);
          res.send("<script>sessionStorage.setItem('mean-token', '" + token + "');window.history.go(-1);</script>");
      }else{
        res.send("<script>window.history.go(-2);</script>");
      }
    })(req, res);
  });

  // get user profile if logged in
  app.get('/users/profile', app.auth, function(req, res){
    // If no user ID exists in the JWT return a 401
    if (!req.user._id) {
      res.status(401).json({
        "message" : "UnauthorizedError: private profile"
      });
    } else {
      // Otherwise continue
      app.models.User.findById(req.user._id).exec(function(err, user) {
          user.hash = undefined;
          user.salt = undefined;
          res.status(200).json(user);
      });
    }
  });



  return function(req, res, next) {
      next();
  };
};
