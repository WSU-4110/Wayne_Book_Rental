const express = require('express');
var multer = require('multer');
const router = express.Router();
const path = require('path');


const PostBook = require('../models/post.model');
const authenticate = require('../middleware/authenticate')

router.use(express.static(__dirname + '/'));

///////////////// For Uploading images /////////////////////////
if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  
  var Storage= multer.diskStorage({
    destination:"./uploads/",
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  });
  
  var upload = multer({
    storage:Storage
  }).single('img');
//////////////////////////////////////////////////////////////////

router.get('/post', authenticate, function(req, res, next){
    res.sendFile(path.join(__dirname ,  '../Post-Book.html'));
})

router.post("/post", upload, function(req, res, next){
    var bookDetails = new PostBook({
        Title: req.body.title,
        FName: req.body.fname,
        LName: req.body.lname,
        Publisher: req.body.Publisher,
        Edition: req.body.edition,
        Subject: req.body.Subject,
        Condition: req.body.condition,
        Isbn: req.body.ISBN,
        Description: req.body.message,
        Price: req.body.Price,
        Image: req.file.filename
    });
    console.log(bookDetails);
    bookDetails.save(function(err, req1){
        if(err) throw err;
        else res.sendFile(path.join(__dirname ,  '../Thank-You.html'));
    });

})

module.exports = router;