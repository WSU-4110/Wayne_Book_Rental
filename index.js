//Adding dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require("mongoose");

const PORT=4000;
const app = express(); /* Standard */
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});// Connects to local database



const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to local database")
  // we're connected!
});



app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});


app.listen(PORT, () => {
    try {
      console.log(`server started on port ${PORT} `);
    } catch (error) {
      console.log(error);
    }
  })