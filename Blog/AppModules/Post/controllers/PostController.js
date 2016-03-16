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
  // (Roshdy)Posting comments on the blog
  // app.post('/posts',function(req,res){

  //   var comment = req.body.text;
  //   var newComment = new app.models.Comment({
  //     text: newComment

  //   });
  //   newComment.save(function(err){
  //     if (err) throw err;
  //   });
  //   res.sendStatus(200);

  //   });
  //   app.put('/posts',function(req,res){

  //   });
 //end roshdy
  });

  return function(req, res, next) {
    next();
  };
};
