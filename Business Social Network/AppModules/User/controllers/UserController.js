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

    user.setPassword(req.body.password);

    user.save(function(err) {
      if(err){
        console.log(err);
      }else{
        var token;
        token = user.generateJwt();
        res.status(200);
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
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      } else {
        // If user is not found
        res.status(401).json(info);
      }
    })(req, res);
  });

  // get user profile if logged in
  app.get('/users/profile', app.auth, function(req, res){
    // If no user ID exists in the JWT return a 401
    if (!req.payload._id) {
      res.status(401).json({
        "message" : "UnauthorizedError: private profile"
      });
    } else {
      // Otherwise continue
      app.models.User.findById(req.payload._id).exec(function(err, user) {
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
