module.exports = function(app, route, express) {

  //search blog posts
  app.get('/posts', function(req, res){
    app.models.Post.find({}, function(err, posts){
      if (err) throw err;
      res.json(posts);
    });
  });

  //get post with comments
  app.get('/posts/:post_id', function(req, res){
    app.models.Post.findOne({_id: params.post_id})
                   .populate({
                     path: 'comments',
                     populate: { path: 'user' }
                   })
                   .exec(function(err, post){
                     if (err) throw err;
                     res.json(post);
                   });
  });

//to edit a specific post:

  app.put('/posts/:post_id/edit', function(req, res){
    app.models.Post.find({}, function(err, posts){
      if (err) throw err;
      res.json(posts);
    });
  });


  return function(req, res, next) {
    next();
  };
};
