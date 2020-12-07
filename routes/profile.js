const express = require("express");
var multer = require("multer");
const router = express.Router();
const path = require("path");
const sgMail = require('@sendgrid/mail');
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const SendgridApi = process.env.Sendgrid_Api;
sgMail.setApiKey(SendgridApi);

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

router.get('/edit/:id', authenticate, checkUser, function(req, res, next){
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

router.get('/ownerprofile/:id', authenticate, checkUser, function(req, res, next){
    var id = req.params.id;

    if(id == res.locals.user._id){
        res.redirect('/profile');
    }

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
})

router.get('/reportprofile/:id', authenticate, checkUser, function (req, res, next) {

    //res.render('report');

    var ID = req.params.id;

    UserModel.findById(ID,function(err,data){
        res.render('reportpage',{
            Owner: data

        })
    })


});

router.post("/report", authenticate, checkUser, function (req, res, next) {

    //res.render('profile');

    sgMail.send({
        to: 'gx6477@wayne.edu',
        from: 'gx6477@wayne.edu',
        subject: 'User reported',
        text: req.body.username + ' has reported the user ' + req.body.name + " with user unique id " + req.body.ID + 
                " for: " + req.body.msg + ". Please review the issue and take steps and reach out to them at " + req.body.senderemail
    }, function(err, json){
        if(err){
            console.log(err);
            return res.send(err);}
        res.redirect('feed');
    })

});

router.post("/rate", authenticate, checkUser, (req, res, next)=>{
    var id = req.body._id;
    var rate_prev = Number(req.body.userrating);
    
    var newRating = Number(req.body.star);
    
    var numRated = Number(req.body.numrated) + 1;

    let rate  = (Number(rate_prev) + Number(newRating)) / Number(numRated);

    var addrating = UserModel.findByIdAndUpdate(id,{
        rating: rate,
        numRated: numRated,
        $push:{ratedby:res.locals.user._id}
    }, {new: true, useFindAndModify: false})

    UserModel.findById(id,function(err,data){
        var ratedbyusers = data.ratedby;

        var ratedbyexits = ratedbyusers.includes(res.locals.user._id);
        console.log(ratedbyexits);
        if(!ratedbyexits){
            addrating.exec(function(err, data){
                if(err) throw err;
                res.redirect('back');
            })
        }else{
            console.log("User already rated");
            res.status(204).send();
        }
    })
})


module.exports = router;