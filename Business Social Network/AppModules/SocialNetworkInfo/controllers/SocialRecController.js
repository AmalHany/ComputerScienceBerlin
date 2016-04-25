module.exports = function(app, route, express) {

  var graph = require('fbgraph');// facebook graph api module

  app.get('/socialRecs', function(req, res){
    var access_token = "CAACEdEose0cBAAtunrmyO8YFqhOnzKwbOr7qHOQJqFJlcYfQ6bU149m0m0EbdN3hR6yDPimtMFncA9KE8KSkGJfUKGMz3Pa0ZAH3idSE7WxIfNUI7jvB1oWAKdZATFV3HC1qAUTws5YPZAYPpIk3Je5GjCbMFvkYDFG9wCz56ZAVLxklCMwi4WMRmFNn8f3iRaAZA8QxDXSgWIyf6bOQC";//user facebook access token
    var query = "me?fields=age_range,gender,feed{description,message,likes},likes{about,name},location,books{name,description,written_by},movies{genre,name,description},groups{name},television{genre,name},music{name,genre},events{name}";// facebook graph api query string
    graph.setAccessToken(access_token);// perform the query to the session's user account
    graph.get(query, function(err, response) {// perform a get request to facebook graph api
      var mytags = getTags(response);// process the response json object to extract usefull tags

      app.models.Product.aggregate([
        {
          $project: {
            name: 1,
            match_count: {
              $size: {
                $setIntersection: [ "$tags", mytags]
              }
            }
          }
        },
        {
          $match: {
            match_count: { "$gt": 0 }
          }
        },
        {
          $sort: { match_count: -1 }
        }
      ], function(err, result){
        if(err){
          console.log(err);
        }
        else {
          res.json(result);
        }
      });

    });
    
  });

  var getTags = function(fbObj){
    var glossary = require("glossary")({// library to process text and extract usefull keywords
          blacklist: ["/","_","&","$","%","★","😻","=","◀","ا"],// items to avoid while processing text
          collapse: true// avoid spliting names as much as possible
    });

    var age = fbObj.age_range.max;// extracting age of user
    var gender = fbObj.gender;// extracting gender of user
    var location = glossary.extract(fbObj.location.name);// extract location information
    var posts = fbObj.feed.data.map(function(post){// extract tags from every post
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
    var likes = fbObj.likes.data.map(function(like){// extract tags from every like
      var obj = {};
      obj.tags = like.name.split(" ");
      // if(like.about !== undefined)
      //   obj.tags = obj.tags.concat(glossary.extract(like.about));
      return obj;
    });
    var books = fbObj.books.data.map(function(book){// extract tags from every book
      var obj = {};
      obj.tags = glossary.extract(book.name);
      if(book.description !== undefined)
        obj.tags = obj.tags.concat(glossary.extract(book.description));
      if(book.written_by !== undefined)
        obj.tags.push(book.written_by);
      return obj;
    });
    var movies = fbObj.movies.data.map(function(movie){// extract tags from every movie
      var obj = {};
      obj.tags = glossary.extract(movie.name);
      // if(movie.description !== undefined)
      //   obj.tags = obj.tags.concat(glossary.extract(movie.description));
      if(movie.genre !== undefined)
        obj.tags.push(movie.genre);
      return obj;
    });
    var groups = fbObj.groups.data.map(function(group){// extract tags from every group
      var obj = {};
      obj.tags = glossary.extract(group.name);
      return obj;
    });
    var television = fbObj.television.data.map(function(show){// extract tags from every television item
      var obj = {};
      obj.tags = glossary.extract(show.name);
      if(show.genre !== undefined)
        obj.tags.push(show.genre);
      return obj;
    });
    var music = fbObj.music.data.map(function(m){// extract tags from every music item
      var obj = {};
      obj.tags = [];
      obj.tags.push(m.name);
      if(m.genre !== undefined)
        obj.tags = obj.tags.concat(glossary.extract(m.genre));
      return obj;
    });
    var events = fbObj.events.data.map(function(e){//extract tags from every event
      var obj = {};
      obj.tags = glossary.extract(e.name);
      return obj;
    });

    var tagList = [];// create an empty list of tags

    //add extracted information to the final result
    tagList.push(gender);
    tagList.push(age + "");
    tagList = tagList.concat(location);
    tagList = tagList.concat(music.map(function(m){return m.tags}).reduce(function(prev, curr){// aggregate all music items' tags together in one list
      return prev.concat(curr);
    }, []));
    tagList = tagList.concat(movies.map(function(m){return m.tags}).reduce(function(prev, curr){// aggregate all movie items' tags together in one list
      return prev.concat(curr);
    }, []));
    tagList = tagList.concat(events.map(function(m){return m.tags}).reduce(function(prev, curr){// aggregate all event items' tags together in one list
      return prev.concat(curr);
    }, []));
    tagList = tagList.concat(television.map(function(m){return m.tags}).reduce(function(prev, curr){// aggregate all television items' tags together in one list
      return prev.concat(curr);
    }, []));
    tagList = tagList.concat(groups.map(function(m){return m.tags}).reduce(function(prev, curr){// aggregate all group items' tags together in one list
      return prev.concat(curr);
    }, []));
    tagList = tagList.concat(books.map(function(m){return m.tags}).reduce(function(prev, curr){// aggregate all book items' tags together in one list
      return prev.concat(curr);
    }, []));
    tagList = tagList.concat(likes.map(function(m){return m.tags}).reduce(function(prev, curr){// aggregate all like items' tags together in one list
      return prev.concat(curr);
    }, []));
    tagList = tagList.concat(posts.map(function(m){return m.tags}).reduce(function(prev, curr){// aggregate all post items' tags together in one list
      return prev.concat(curr);
    }, []));

    Array.prototype.unique = function (){// function to remove duplicate elements in an array
        var r = new Array();
        o:for(var i = 0, n = this.length; i < n; i++){
            for(var x = 0, y = r.length; x < y; x++){
                if(r[x]==this[i]) continue o;}
            r[r.length] = this[i];}
        return r;
    }

    return tagList.unique();// return only unique tags
  };

  return function(req, res, next) {
      next();
  };
};
