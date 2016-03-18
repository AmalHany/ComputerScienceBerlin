module.exports = function(app, route, express) {

  //sign up
  app.post('/users/signup', function(req, res){
    
    var newUser = new app.models.User({
      f_name: req.body.newUser.fName,
      l_name: req.body.newUser.lName,
      username: req.body.newUser.uName,
      password: req.body.newUser.pass
    });

    newUser.save(function(err){
      if(err) throw err;
    });

    res.send(200);

  });

  //sign in
  app.post('/users/signin', function(req, res){

    app.models.User.findOne({username: req.body.user.uName, password: req.body.user.pass},
      function(err, user){
        if(user === null)
        {
          res.json(null);
        }
        else
        {
          res.json({msg: "signed in :D"});
        }
      }
    );

  });



  return function(req, res, next) {
    next();
  };
};
