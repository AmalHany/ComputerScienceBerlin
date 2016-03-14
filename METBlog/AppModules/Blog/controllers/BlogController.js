module.exports = function(app, route, express) {

  //get all blogs
  app.get('/blogs', function(req, res){
    app.models.Blog.find({}, function(err, blogs) {
      // fake data to test
      blogs = [
        {id: 1, title: "TITLE ALS", description: "asdbhaksdnansjdaa", user:{f_name: "sam"}},
        {id: 2, title: "TITLE asdLS", description: "ahaksdnansjdaa", user:{f_name: "jam"}},
        {id: 3, title: "TLE ALS", description: "asdaksdnansjdaa", user:{f_name: "george"}},
        {id: 4, title: "TITLE ALS", description: "asdbhaksdnansjdaa", user:{f_name: "am"}},
        {id: 5, title: "TIE ALS", description: "asdbhasdsdnansjdaa", user:{f_name: "sam"}},
        {id: 6, title: "TIE AL", description: "asdbhaksdnansjdaa", user:{f_name: "sam"}}
      ];
      res.json(blogs);
    });
  });

  return function(req, res, next) {
      next();
  };
};
