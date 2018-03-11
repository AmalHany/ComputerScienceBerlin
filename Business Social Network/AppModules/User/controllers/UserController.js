module.exports = function(app, route, express) {




  return function(req, res, next) {
      next();
  };
};
