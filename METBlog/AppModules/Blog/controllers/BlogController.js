module.exports = function(app, route, express) {

  //get a blog
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

   app.post('/blogs/:blog_id', function(req, res){

    var postTitle = req.body.title;
    var postContent = req.body.content;
    var postBlog = req.body.blog;
    var postDate = req.body.date;


    var newPost = new app.models.Post({
      title: postTitle,
      content: postContent,
      blog: postBlog,
      date: postDate
    });
    newPost.save(function(err) {
      if (err) throw err;
    });
    res.sendStatus(200);
  });


    app.delete('/blogs/:blog_id', function(req, res){
    app.models.Post.remove({ _id: req.body.postID }, function (err) {
        if(!err)
        {
          res.sendStatus(200);
        }
    });
  });




    app.put('/blogs/:blog_id', function(req, res){
    app.models.Post.remove({ _id: req.body.postID }, function (err) {
        if(!err)
        {
          res.sendStatus(200);
        }
    });
  });


  return function(req, res, next) {
      next();
  };
};
