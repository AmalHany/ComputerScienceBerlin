module.exports = function(app, route, express) {

  //sign up
  app.post('/users', function(req, res){

    var newUser = new app.models.User({
      f_name: req.body.fName,
      l_name: req.body.lName,
      username: req.body.uName,
      password: req.body.pass
    });

    newUser.save(function(err){
      if(err) throw err;
    });

    res.send(200);

  });



  return function(req, res, next) {
    next();
  };
};
