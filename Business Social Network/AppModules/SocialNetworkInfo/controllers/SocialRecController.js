module.exports = function(app, route, express) {

  var graph = require('fbgraph');

  //get a facebook data
  app.get('/socialRec', function(req, res){
     graph.setAccessToken("CAACEdEose0cBAKdHZCW0BvI6AtlZCb00PBYZAoZAwafFSPHgEa5pxpB9jCZBg9hFuHiRJaKiUbZCL9zCYVEm4r3yKgFB9tZCIGO2DO5gCvEQAMvgFVfrR4NWK6cZBBDYYD7jgZCZCcTZC7BeQ9dZARGdrR071ZCLsFTjSZByDTZBnF7eQpAkMTLzZChMishuwtXf6ZAQ1YLUtDT8KXyqZAZAwYsLCWjcvOT");
     var userId = "george.moheb.7";
     graph.post(userId + "/feed?access_token=007", wallPost, function(err, res) {
        // returns the post id
        console.log(res); // { id: xxxxx}
    });
  });

  return function(req, res, next) {
      next();
  };
};
