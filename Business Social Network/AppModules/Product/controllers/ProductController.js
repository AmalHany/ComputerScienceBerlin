module.exports = function(app, route, express) {


  //get all blogs
  app.get('/Product', function(req, res){
    app.models.Blog.find({}, function(err, blogs) {
      if (err) throw err;
      res.json(products);
    });
  });

  return function(req, res, next) {
      next();
  };
};
