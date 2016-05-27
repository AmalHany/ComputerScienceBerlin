module.exports = function(app, route, express) {

            //abod
              app.get('/showreports', function(req, res){
    //console.log(app);
    var x=app.models.Report.db.collection('reports');
    x.find().toArray(function(err,items){
     // console.log(JSON.stringify(items));
      res.json(items);
       });
//   app.models.Business.db.collection.find().toArray(function (err, docs) {
//     console.log(JSON.stringify(docs));
// });
});
              //abod


    return function(req, res, next) {
    next();
  };

};