//Adding dependencies
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose= require("mongoose");
const PostRoute = require('./routes/post');
const AuthRoute = require('./routes/auth');
const HomeRoute = require('./routes/home');

const PORT=4000;
const app = express(); /* Standard */
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});// Connects to local database



const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to local database")
  // we're connected!
});

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({secret: 'verySecretValue'}));

var fs = require('fs');

/////////// App caliing the routes//////////////////
app.get("/", (req, res) =>{
  res.sendFile(__dirname + '/Log-in.html', 'utf8');
})

app.get('/post', PostRoute);

app.post('/post', PostRoute);

app.use('/', AuthRoute);

app.use('/', HomeRoute);
////////////////////////////////////////////////////

app.listen(PORT, () => {
    try {
      console.log(`yo dawgs, server started on port ${PORT} `);
    } catch (error) {
      console.log(error);
    }
  })