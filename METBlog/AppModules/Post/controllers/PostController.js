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
    app.models.Post.findOne({_id: req.params.post_id})
                   .populate("comments user")
                   .exec(function(err, post){
                     if (err) throw err;
                     res.json(post);
                   });
  });


  app.delete('/posts/:post_id', function(req, res){
    
  var post_id = req.body.postID,//assume get 54fcb3890cba9c4234f5c925
   comment_id = req.body.commentID;// assume get 54fcb3890cba9c4234f5c925
  
  app.models.Post.findByIdAndUpdate(
    post_id,
   { $pull: { 'comments': {  _id: comment_id } } },function(err,model){
      if(err){
        console.log(err);
        return res.send(err);
        }
        return res.json(model);
    });


});


  app.post('/posts/:post_id', function(req, res){
    
  var post_id = req.body.postID;//assume get 54fcb3890cba9c4234f5c925
  
  




  app.models.Post.findByIdAndUpdate(
    post_id,
   { $push: { 'comments': {   text:req.body.ctext ,date:'1111-11-11'  }} },function(err,model){
      if(err){
        console.log(err);
        return res.send(err);
        }
        return res.json(model);
    });







 });

  return function(req, res, next) {
    next();
  };
};
