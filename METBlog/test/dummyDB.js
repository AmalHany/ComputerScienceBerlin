var mongoose = require('mongoose');

var db = mongoose.connection;

// db.on('error', console.error);
// db.once('open', function() {
// });


  var Blog= require('./../AppModules/Blog/models/Blog');
  var Post= require('./../AppModules/Post/models/Post');
  var User= require('./../AppModules/User/models/User');
  

// var UsersBag = [{_id:"u1",f_name:"hazem",l_name:"agaty",blogs:{_id:"b12"}},
//                 {_id:"u2",f_name:"mohsen",l_name:"fahmy",blogs:{_id:"b22"}},
//                 {_id:"u3",f_name:"eslam",l_name:"fanta",blogs:{_id:"b32"}}];

// var BlogsBag = [{_id:"b12",title:"blog1",description:"blog1",data:"1111-11-1",posts:[], user:{_id:"u1"}},
// 				{_id:"b22",title:"blog2",description:"blog2",data:"1111-11-1",posts:[], user:"u2"},
// 				{_id:"b32",title:"blog3",description:"blog3",data:"1111-11-1",posts:[], user:"u3"}];


 //ObjectId = mongoose.Schema.Types.ObjectId;

// var PostsBag = [{title:"post1",content:"post1",data:"1111-11-1",blog: {_id:"b12"},comments:[]},
// 				{title:"post2",content:"post2",data:"1111-11-1",blog: {_id:"b12"},comments:[]},
// 				{title:"post3",content:"post3",data:"1111-11-1",blog: {_id:"b12"},comments:[]}];


// User.collection.insert(UsersBag,onInsert);
// Blog.collection.insert(BlogsBag, onInsert);
// Post.collection.insert(PostsBag,onInsert);

// function onInsert(err, docs) {
//     if (err) {
//         // TODO: handle error
//     } else {
//         console.info('%d successfully stored.', docs.length);
//     }
// }



var u1 = new User({f_name:"hazem",l_name:"agaty", username: "hazem.agaty", password: "123", blogs:[]});
var u2 = new User({f_name:"mohsen",l_name:"fahmy", username: "mohsen.fahmy", password: "123", blogs:[]});
var u3 = new User({f_name:"eslam",l_name:"fanta", username: "eslam.fanta", password: "123", blogs:[]});

u1.save(function (err) {
  if (err) {
    console.info("fail1");
  }
  else{
    console.info("success");
  }
});

u2.save(function (err) {
  if (err) {
    console.info("fail2");
  }
  else{
    console.info("success");
  }
});

u3.save(function (err) {
  if (err) {
    console.info("fail3");
  }
  else{
    console.info("success");
  }
});

var b1 = new Blog({title:"blog1",description:"blog1",date:"1111-11-1",posts:[],user:u1._id});
var b2 = new Blog({title:"blog2",description:"blog2",date:"1111-11-1",posts:[],user:u2._id});
var b3 = new Blog({title:"blog3",description:"blog3",date:"1111-11-1",posts:[],user:u3._id});

u1.blogs= b1._id;
u2.blogs= b2._id;
u3.blogs= b3._id;

b1.save(function (err) {
  if (err) {
    console.log(err);
    console.info("failb");
  }
  else{
    console.info("success");
  }
});

b2.save(function (err) {
  if (err) {
    console.log(err);
    console.info("failb");
  }
  else{
    console.info("success");
  }
});

b3.save(function (err) {
  if (err) {
    console.log(err);
    console.info("failb");
  }
  else{
    console.info("success");
  }
});



var p1 = new Post({title:"post1",content:"post1",date:"1111-11-1",blog: b1._id,comments:[{text:"comment1",date:"1111-11-1",user:u1._id},
  {text:"comment2",date:"1111-11-1",user:u2._id}]});
var p2 = new Post({title:"post2",content:"post2",date:"1111-11-1",blog: b2._id,comments:[]});
var p3 = new Post({title:"post3",content:"post3",date:"1111-11-1",blog: b3._id,comments:[]});

b1.posts = [p1._id];
b2.posts = [p2._id];
b3.posts = [p3._id];


p1.save(function (err) {
  if (err) {
    console.log(err);
    console.info("failp");
  }
  else{
    console.info("success");
  }
});

p2.save(function (err) {
  if (err) {
    console.log(err);
    console.info("failp");
  }
  else{
    console.info("success");
  }
});

p3.save(function (err) {
  if (err) {
    console.log(err);
    console.info("failp");
  }
  else{
    console.info("success");
  }
});

 // var c1 = new Comment({text:"comment1",date:"1111-11-1",user:u1._id});
 // var c2 = new Comment({text:"comment2",date:"1111-11-1",user:u2._id});
 // var c3 = new Comment({text:"comment3",date:"1111-11-1",user:u3._id});


// c1.save(function (err) {
//   if (err) {
//     console.log(err);
//     console.info("failc");
//   }
//   else{
//     console.info("success");
//   }
// });

// c2.save(function (err) {
//   if (err) {
//     console.log(err);
//     console.info("failc");
//   }
//   else{
//     console.info("success");
//   }
// });

// c3.save(function (err) {
//   if (err) {
//     console.log(err);
//     console.info("failc");
//   }
//   else{
//     console.info("success");
//   }
// });




mongoose.connect('mongodb://localhost/blogapp');
