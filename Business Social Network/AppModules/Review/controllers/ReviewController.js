module.exports = function(app, route, express) {

/////////////////////////////////////////////////////////////////

  app.get('/reviews', function(req, res){
    app.models.Review.find({}, function(err, reviews) {
      res.json(reviews);
    });
  });

  app.post('/reviews', function(req, res){
    var Review = req.body.Review;
    var ReviewDate = req.body.Dates;
    

    var Review = new app.models.Review({
      Review: Review,
      Dates: ReviewDate,
      
      
    });
    Review.save(function(err) {
      if (err) throw err;
    });
    res.sendStatus(200);
  });
  
 



////////////////////////////////////////////////////////

  return function(req, res, next) {
    next();
  };

};
