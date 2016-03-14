module.exports = function(app, route, express) {

  //get all blogs
  app.get('/blogs', function(req, res){
    app.models.Blog.find({}, function(err, blogs) {
      // fake data to test
      // blogs = [
      //   {title: "TITLE ALS", description: "asdbhaksdnansjdaa", user:{f_name: "sam"}},
      //   {title: "TITLE asdLS", description: "ahaksdnansjdaa", user:{f_name: "jam"}},
      //   {title: "TLE ALS", description: "asdaksdnansjdaa", user:{f_name: "george"}},
      //   {title: "TITLE ALS", description: "asdbhaksdnansjdaa", user:{f_name: "am"}},
      //   {title: "TIE ALS", description: "asdbhasdsdnansjdaa", user:{f_name: "sam"}},
      //   {title: "TIE AL", description: "asdbhaksdnansjdaa", user:{f_name: "sam"}}
      // ];
      res.json(blogs);
    });
  });

  return function(req, res, next) {
      next();
  };
};
