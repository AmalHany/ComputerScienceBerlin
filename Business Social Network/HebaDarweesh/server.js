var express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
    mongoose          = require('mongoose'),
    signupController = require('./server/controllers/signup-controller')

mongoose.connect('mongodb://localhost:27017/HebaDarweesh'); 

app.use(bodyParser()); //Tells the server to use bodyparser 


app.get('/', function (req, res) { 
  res.sendFile(__dirname + '/client/views/index.html'); 
});


app.get('/Business.html', function (req, res) { 
  res.sendFile(__dirname + '/client/views/Business.html'); 
});

app.get('/user.html', function (req, res) { 
  res.sendFile(__dirname + '/client/views/user.html'); 
});

app.use('/js', express.static(__dirname + '/client/js')); //Tells the server to listen 

app.get('/api/users', signupController.list); // gets data from the database
app.post('/api/users', signupController.create);// Inserts into the database. These are Verbs.

app.listen(3000, function() { //Tells the server to listen on a certain port
  console.log('Open Localhost 3000');
})