const express = require("express");
var multer = require("multer");
const router = express.Router();
const path = require("path");

const PostBook = require("../models/post.model");
const UserModel = require("../models/User");
const authenticate = require("../middleware/authenticate");
const checkUser = require("../middleware/checkUser");
const { json } = require("body-parser");

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

router.post("/edit/", authenticate, checkUser, function(req, res, next){
    
    var id = req.body._id;

    var edit = PostBook.findByIdAndUpdate(id,{
        Title: req.body.Title,
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

router.get('/ownerprofile/:id', function(req, res, next){
    var id = req.params.id;

    var Ownerdata = UserModel.findById(id);
    var Bookdata = PostBook.find({OwnerID: id});

    Ownerdata.exec(function(err, data){
        if(err) throw err;
        Bookdata.exec(function(err, bookdata){
            if(err) throw err;
            res.render('Owner_Profile',{
                Owner: data,
                books: bookdata
            });
            
        })

    })

    // UserModel.findById(id, function (err, data){
    //     var Ownerdata = response.write(JSON.stringify(data));
    //     var Ownerjson = 
    // })

    // PostBook.findById(id, function (err, data) {
    //     var Bookdata = data;
    // })

    // res.render('Owner_Profile',{
    //     Owner: Ownerdata,
    //     books: Bookdata
    // });
})

module.exports = router;