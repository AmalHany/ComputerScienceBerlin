module.exports = function(app, route, express) {


  app.get('/prodreviews', function(req, res){
    app.models.ProdReview.find({}, function(err, reviews) {
      res.json(reviews);
    });
  });

  app.post('/prodreviews', function(req, res){
    var Text = req.body.Text;
   
    

    var newText = new app.models.ProdReview({
      Text: Text,
      
      
    });
    newText.save(function(err) {
      if (err) throw err;
    });
    res.sendStatus(200);
  });
  
 


  return function(req, res, next) {
    next();
  };

};
