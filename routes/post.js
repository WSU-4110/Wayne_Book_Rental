const express = require('express');
const router = express.Router();
const path = require('path');
const PostBook = require('../models/post.model');
//var book = PostBook.find({});


router.get('/post', function(req, res, next){
    res.sendFile(path.join(__dirname ,  '../Post-Book.html'));
})

router.post("/post", function(req, res, next){
    var bookDetails = new PostBook({
        Title: req.body.title,
        FName: req.body.fname,
        LName: req.body.lname,
        Publisher: req.body.Publisher,
        Edition: req.body.edition,
        Subject: req.body.Subject,
        Condition: req.body.condition,
        Isbn: req.body.ISBN,
        Description: req.body.message

    });
    res.send(200);
    console.log(bookDetails);
    bookDetails.save();


})

module.exports = router;