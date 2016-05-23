module.exports = function(app, route, express) {

app.get('/users/:user_id', function(req, res){

    app.models.User.findOne({_id: req.params.user_id})    //getting user by id
                   .populate('users')
                   .exec(function(err, users){
                     if (err) throw err;
                     res.json(users);
                   });
  });

return function(req, res, next) {
      next();
  };

};
