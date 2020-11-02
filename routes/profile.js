const express = require("express");
var multer = require("multer");
const router = express.Router();
const path = require("path");

const PostBook = require("../models/post.model");
const authenticate = require("../middleware/authenticate");
const checkUser = require("../middleware/checkUser");

router.get("/profile", authenticate, checkUser, function (req, res, next) {

    //res.render('profile');

    var fltrprofile = res.locals.user._id;

    PostBook.find({OwnerID: fltrprofile}, function (err, data) {
        res.render('profile', {
            books: data
        });
    }).sort({ "_id": -1 })

});

router.get('/delete/:id', function(req, res, next){
    var id = req.params.id;

    PostBook.findByIdAndDelete(id, function(err){
        if(err) throw err;
        res.redirect('/profile');
    })
})

router.get('/edit/:id', function(req, res, next){
    var id = req.params.id;

    PostBook.findById(id, function (err, data) {
        res.render('Post-BookV2', {
            books: data
        });
    })
})

router.post('/edit/:id', function(req, res, next){
    
    var id = req.body.id;

    console.log(id);

    // PostBook.findOneAndUpdate({_id: Id}, {
    //     Title: req.body.Title,
    //     FName: req.body.fname,
    //     LName: req.body.lname,
    //     Publisher: req.body.Publisher,
    //     Edition: req.body.edition,
    //     Subject: req.body.Subject,
    //     Condition: req.body.condition,
    //     Isbn: req.body.ISBN,
    //     Description: req.body.message,
    //     Price: req.body.Price
    // }, {useFindAndModify: false})
    // .then(inst => {
    //     console.log(inst);
    // })
    // .catch(err => {
    // console.log("error!", err);
    // });

    // res.redirect('/profile');

    var edit = PostBook.findByIdAndUpdate(id,{
        Title: req.body.title,
        FName: req.body.fname,
        LName: req.body.lname,
        Publisher: req.body.Publisher,
        Edition: req.body.edition,
        Subject: req.body.Subject,
        Condition: req.body.condition,
        Isbn: req.body.ISBN,
        Description: req.body.message,
        Price: req.body.Price
    }, {new: true, useFindAndModify: false})

    edit.exec(function(err, data){
        if(err) throw err;
        res.redirect("/profile");
    })
})



module.exports = router;