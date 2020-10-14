//Adding dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require("mongoose");
const route = require('./routes/post');
const AuthRoute = require('./routes/auth')

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

var fs = require('fs');

/*app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});*/

/*app.get("/", (req, res) => {
  res.writeHead(200, {'content-Type': 'text/html'});
  var myReadStream = fs.createReadStream(__dirname + '/Log-in.html', 'utf8');
  myReadStream.pipe(res);
});*/

app.get("/", (req, res) =>{
  res.sendFile(__dirname + '/Log-in.html', 'utf8');
})

app.get('/post', route);

app.post('/post', route);

app.use('/', AuthRoute);


app.listen(PORT, () => {
    try {
      console.log(`yo dawgs, server started on port ${PORT} `);
    } catch (error) {
      console.log(error);
    }
  })