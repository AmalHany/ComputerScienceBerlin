module.exports = function(app, route, express) {

  //get a facebook data
  app.get('/socialRec', function(req, res){

  });

  return function(req, res, next) {
      next();
  };
};
