module.exports = function(app, route, express) {

/////////////////////////////////////////////////////////////////

 
   app.post('/signup', function(req, res){
    var username = req.body.username;
    var password=req.body.password;
    var email=req.body.email;
    var number=req.body.number;
    var cat1=req.body.cat1;
    var cat2=req.body.cat2;
    var cat3=req.body.cat3;



    var neww=app.models.signup;
    var newuser = new app.models.signup({
      username: username,
      password:password,
      email:email,
      number:number,
      cat1:cat1,
      cat2:cat2,
      cat3:cat3
    });

    neww.find({username:username},function(err,docs){
     if(docs.length){
      console.log('mat3mlsh add');
      //res.send('n');
      res.send('n');
     }else{
      console.log('et3ml add');
      newuser.save(function(error){
        if(error) throw error;
      });
       res.send('y');
     }
     
    });


  });


////////////////////////////////////////////////////////

  return function(req, res, next) {
    next();
  };

};