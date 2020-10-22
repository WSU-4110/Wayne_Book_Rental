const express = require("express");
const router = express.Router();
const path = require("path");
const PostBook = require("../models/post.model");

router.get("/feed", function (req, res, next) {
    PostBook.find({}, function(err, data){
        res.render('feed', {
            books: data
        });
    }).sort({"_id":-1})
  
});

module.exports = router;
