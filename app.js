//Adding dependencies
const express = require('express');
const bodyParser = require('body-parser');

var app = express();

var port = 4000

app.listen(port, () =>{
    console.log('Server is up and running on port number ' + port);
})