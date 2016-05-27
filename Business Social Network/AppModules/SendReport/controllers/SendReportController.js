module.exports = function(app, route, express) {

/////////////////////////////////////////////////////////////////

 
   app.post('/Report', function(req, res){
    var id= req.body.id;
    var report=req.body.report;
   


    var neww=app.models.sendReport;
   
    neww.findOne({id:id},function(err,result){
     if(result.length){
        result.report=report;
     }
     
    });


  });


////////////////////////////////////////////////////////

  return function(req, res, next) {
    next();
  };

};