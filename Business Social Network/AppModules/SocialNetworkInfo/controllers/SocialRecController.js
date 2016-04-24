module.exports = function(app, route, express) {

  var graph = require('fbgraph');

  app.get('/socialTags', function(req, res){
    var access_token = "CAACEdEose0cBACnyOfKvTEpDUCg3pXp4gWszv2cg5KPXpzfqgOwZASfZCm8qZAWpUp3OAC3AuZAvGav8LdKXnH30h3V05e8qb3ElOuDijjvGYLcSKulUZAvUo6dIbQDvm6luOrcO9jZArdhFAk4bPR2oIf5p9xj0UhIrPOwqS9B8rvYCOWl6LZB2lThV7iqpwX8JKc5AwZBZAvlPEdjQQdAjO";
    var query = "me?fields=age_range,gender,feed{description,message,likes},likes{about,name},location,books{name,description,written_by},movies{genre,name,description},groups{name},television{genre,name},music{name,genre},events{name}";
    graph.setAccessToken(access_token);
    graph.get(query, function(err, response) {
      var tags = getTags(response);
      res.send(tags);
    });
  });

  var getTags = function(fbObj){
    var glossary = require("glossary")({
          blacklist: ["/","_","&","$","%","★","😻","=","◀","ا"],
          collapse: true
    });

    var age = fbObj.age_range.max;
    var gender = fbObj.gender;
    var location = glossary.extract(fbObj.location.name);
    var posts = fbObj.feed.data.map(function(post){
      var obj = {};
      obj.tags = [];
      if(post.message !== undefined)
        obj.tags = obj.tags.concat(glossary.extract(post.message));
      // if(post.description !== undefined)
      //   obj.tags = obj.tags.concat(glossary.extract(post.description));
      obj.likes = 0;
      if(post.likes != undefined)
        obj.likes = post.likes.length;
      return obj;
    });
    var likes = fbObj.likes.data.map(function(like){
      var obj = {};
      obj.tags = like.name.split(" ");
      // if(like.about !== undefined)
      //   obj.tags = obj.tags.concat(glossary.extract(like.about));
      return obj;
    });
    var books = fbObj.books.data.map(function(book){
      var obj = {};
      obj.tags = glossary.extract(book.name);
      if(book.description !== undefined)
        obj.tags = obj.tags.concat(glossary.extract(book.description));
      if(book.written_by !== undefined)
        obj.tags.push(book.written_by);
      return obj;
    });
    var movies = fbObj.movies.data.map(function(movie){
      var obj = {};
      obj.tags = glossary.extract(movie.name);
      // if(movie.description !== undefined)
      //   obj.tags = obj.tags.concat(glossary.extract(movie.description));
      if(movie.genre !== undefined)
        obj.tags.push(movie.genre);
      return obj;
    });
    var groups = fbObj.groups.data.map(function(group){
      var obj = {};
      obj.tags = glossary.extract(group.name);
      return obj;
    });
    var television = fbObj.television.data.map(function(show){
      var obj = {};
      obj.tags = glossary.extract(show.name);
      if(show.genre !== undefined)
        obj.tags.push(show.genre);
      return obj;
    });
    var music = fbObj.music.data.map(function(m){
      var obj = {};
      obj.tags = [];
      obj.tags.push(m.name);
      if(m.genre !== undefined)
        obj.tags = obj.tags.concat(glossary.extract(m.genre));
      return obj;
    });
    var events = fbObj.events.data.map(function(e){
      var obj = {};
      obj.tags = glossary.extract(e.name);
      return obj;
    });

    var tagList = [];

    tagList.push(gender);
    tagList.push(age + "");
    tagList = tagList.concat(location);
    tagList = tagList.concat(music.map(function(m){return m.tags}).reduce(function(prev, curr){
      return prev.concat(curr);
    }, []));
    tagList = tagList.concat(movies.map(function(m){return m.tags}).reduce(function(prev, curr){
      return prev.concat(curr);
    }, []));
    tagList = tagList.concat(events.map(function(m){return m.tags}).reduce(function(prev, curr){
      return prev.concat(curr);
    }, []));
    tagList = tagList.concat(television.map(function(m){return m.tags}).reduce(function(prev, curr){
      return prev.concat(curr);
    }, []));
    tagList = tagList.concat(groups.map(function(m){return m.tags}).reduce(function(prev, curr){
      return prev.concat(curr);
    }, []));
    tagList = tagList.concat(books.map(function(m){return m.tags}).reduce(function(prev, curr){
      return prev.concat(curr);
    }, []));
    tagList = tagList.concat(likes.map(function(m){return m.tags}).reduce(function(prev, curr){
      return prev.concat(curr);
    }, []));
    tagList = tagList.concat(posts.map(function(m){return m.tags}).reduce(function(prev, curr){
      return prev.concat(curr);
    }, []));

    Array.prototype.unique = function (){
        var r = new Array();
        o:for(var i = 0, n = this.length; i < n; i++){
            for(var x = 0, y = r.length; x < y; x++){
                if(r[x]==this[i]) continue o;}
            r[r.length] = this[i];}
        return r;
    }

    return tagList.unique();
  };

  return function(req, res, next) {
      next();
  };
};
