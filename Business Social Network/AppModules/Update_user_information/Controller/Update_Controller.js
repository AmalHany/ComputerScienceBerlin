module.exports = function(app, route, express) {
   app.post('/updateUser', function(req, res){
    var name= req.body.name;
    var phone=req.body.phone;
    var email=req.body.email;
    var password=req.body.password;
    var newpass=req.body.password;
    var x =app.models.updateUserInfo;
    var y = new app.models.updateUserInfo({

      name: name,
      phone:phone,
      email:email,
      passsword:password,
      newpass:newpass
    });
     if(docs){
  docs.name=name;
  docs.phone=phone;
  docs.email=email;
  docs.password=password,
  docs.newpass=newpass
  console.log('Updated');
  res.send('True');
  }
  else{
       console.log('not updated');
     }
