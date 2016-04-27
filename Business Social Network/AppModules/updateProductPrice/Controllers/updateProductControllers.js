module.exports = function(app, route, express) {

/////////////////////////////////////////////////////////////////

 
   app.post('/updateProduct', function(req, res){
    var name= req.body.name;
    var price=req.body.price;
   


    var neww=app.models.updateProductPrice;
   
    neww.findOne({name:name},function(err,result){
     if(result.length){
        result.price=price;
     }
     
    });


  });


////////////////////////////////////////////////////////

  return function(req, res, next) {
    next();
  };

};