module.exports = function(app, route, express) {

  //get all blogs
  app.get('/blogs', function(req, res){
    app.models.Blog.find({}, function(err, blogs) {
      res.json(blogs);
    });
  });

  return function(req, res, next) {
      next();
  };
};
