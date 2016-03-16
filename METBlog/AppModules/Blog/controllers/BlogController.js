module.exports = function(app, route, express) {

  //get a blogs
  app.get('/blogs/:blog_id', function(req, res){
    app.models.Blog.findOne({_id: req.params.blog_id})
                   .populate('posts user')
                   .exec(function(err, blog) {
                     if (err) throw err;
                     res.json(blog);
                   });
  });

  //get all blogs
  app.get('/blogs', function(req, res){
    app.models.Blog.find({}, function(err, blogs) {
      if (err) throw err;
      res.json(blogs);
    });
  });

  return function(req, res, next) {
      next();
  };
};
