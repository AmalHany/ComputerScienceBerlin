module.exports = function(app, route, express) {



  //search blog posts
  app.get('/blogs/:search_str', function(req, res){
  });

  //get post with comments
  app.get('/post/:post_id', function(req, res){
  });

  return function(req, res, next) {
    next();
  };
};
