//Adding dependencies
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose= require("mongoose");
const PostRoute = require('./routes/post');
const AuthRoute = require('./routes/auth');
const HomeRoute = require('./routes/home');
const FeedRoute = require('./routes/feed');
const ProfileRoute = require('./routes/profile');
const PaypalRoute = require('./routes/paypal');

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
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(session({secret: 'verySecretValue'}));
app.set('view engine', 'ejs');

var fs = require('fs');

/////////// App caliing the routes//////////////////
app.get("/", (req, res) =>{
  // res.render('Log-in.ejs',{
  //   passwordnotvalid: {'message': ''}
  // })
  res.sendFile(__dirname + '/Log-in.html', 'utf8');
})

app.get('/post', PostRoute);

app.post('/post', PostRoute);

app.use('/', AuthRoute);

app.use('/', HomeRoute);

app.use('/', FeedRoute);

app.use('/', ProfileRoute);

app.use('/', PaypalRoute);

////////////////////////////////////////////////////

app.listen(PORT, () => {
    try {
      console.log(`yo dawgs, server started on port ${PORT} `);
    } catch (error) {
      console.log(error);
    }
  })
  