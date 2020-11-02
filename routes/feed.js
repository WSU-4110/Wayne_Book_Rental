const express = require("express");
const router = express.Router();
const path = require("path");
const PostBook = require("../models/post.model");
const authenticate = require('../middleware/authenticate');
const { toASCII } = require("punycode");

router.get("/feed", authenticate, function (req, res, next) {
    PostBook.find({}, function (err, data) {
        res.render('feed', {
            books: data
        });
    }).sort({ "_id": -1 })

});

router.post("/filter", authenticate, function (req, res, next) {
    var fltrsubject = req.body.fltrsubject;
    var fltrcondition = req.body.fltrcondition;

    if (fltrsubject != '' && fltrcondition != '') {
        var fltrParameter = { $and: [{ Subject: fltrsubject }, { Condition: fltrcondition }] }
    } else if (fltrsubject == '' && fltrcondition != '') {
        var fltrParameter = { Condition: fltrcondition }
    } else if (fltrsubject != '' && fltrcondition == '') {
        var fltrParameter = { Subject: fltrsubject }
    } else {
        var fltrParameter = {}
    }

    PostBook.find(fltrParameter, function (err, data) {
        res.render('feed', {
            books: data
        });
    }).sort({ "_id": -1 })
})


// GET BOOK BY TITLE

router.post("/search", authenticate, function (req, res, next) {
    var title = req.body.title;

    if (title != '') {
        var fltrParameter = { Title: title }
    } else {
        var fltrParameter = {}
    }

    PostBook.find(fltrParameter, function (err, data) {
        res.render('feed', {
            books: data
        });
    }).sort({ "_id": -1 })
})
router.post("/update", authenticate, function(req, res, next) {
    var title = { Title: "Test"}
    var query = {
        Title: req.body.title
        // FName: req.body.fname,
        // LName: req.body.lname,
        // Publisher: req.body.Publisher,
        // Edition: req.body.edition,
        // Subject: req.body.Subject,
        // Condition: req.body.condition,
        // Isbn: req.body.ISBN,
        // Description: req.body.message,
        // Price: req.body.Price
    }
    PostBook.updateOne(query, function (err, data) {
        if(err){
            throw error
        }else{
            console.log("Successful");
        }
    })
})
router.get("/update", authenticate, function (req, res, next) {
    //res.redirect('/post');
    var title = { Title: "New test"}
    PostBook.find(title, function (err, data) {
        res.render("Post-BookV2", {
            book: data
        });
    })
  });

module.exports = router;
