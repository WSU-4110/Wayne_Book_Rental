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

module.exports = router;
