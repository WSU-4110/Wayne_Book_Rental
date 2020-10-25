const express = require("express");
const router = express.Router();
const path = require("path");
const PostBook = require("../models/post.model");
const authenticate= require('../middleware/authenticate')

router.get("/feed", authenticate, function (req, res, next) {
    PostBook.find({}, function(err, data){
        res.render('feed', {
            books: data
        });
    }).sort({"_id":-1})
  
});

module.exports = router;
