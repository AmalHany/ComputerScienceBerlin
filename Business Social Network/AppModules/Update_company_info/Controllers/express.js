module.exports = function(app, route, express) {

/////////////////////////////////////////////////////////////////


   app.post('/updateCompany', function(req, res){
    var name= req.body.name;
    var phone=req.body.phone;
    var email=req.body.email;
    var category=req.body.category;



    var neww=app.models.updateCompanyInfo;
    var newuser = new app.models.updateCompanyInfo({
      name: name,
      phone:phone,
      email:email,
      category:category
    });

    neww.findOne({name:'microsoft'},function(err,docs){
     if(docs){
        docs.name=name;
        docs.phone=phone;
        docs.email=email;
        docs.category=category;
        console.log('updateed');
        res.send('True');
     }else{

       console.log('not updated');
    
     }

    });


  });


////////////////////////////////////////////////////////

  return function(req, res, next) {
    next();
  };

};
