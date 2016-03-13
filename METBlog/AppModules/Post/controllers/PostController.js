module.exports = function(app, route, express) {


  //search blog posts
  app.get('/posts', function(req, res){
  });

  //get post with comments
  app.get('/posts/:post_id', function(req, res){
  });

  return function(req, res, next) {
    next();
  };
};
