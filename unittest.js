const postbooks = require("./models/post.model");

const express = require("express");

const UserModel = require("./models/User");
const authenticate = require("./middleware/authenticate");
const checkUser = require("./middleware/checkUser");
const { findById } = require("./models/post.model");

module.exports={

    Bookprice(id){
        var bookid = id;
        var Bookp = 60;
        postbooks.findById(bookid, function(err, data){
            if(findById(bookid) >= 50){
                return true;
            }
            else{
                return false;
            }
        })
        return true
    },

    Deletebook(id){
        var userid = id;
        var book = 1;
        UserModel.findById(userid, function(err, data){
            if(bookid == found){
                return true;
            }
            else{
                return false;
            }
        })
        return true
    },

    datesignup(id){
        var userid = id;
        var user = 1;
        UserModel.findById(userid, function(err, data){
            return user;
        })
        return true;
    },

    Sub(id){
        var bookid = id;
        var math = true;

        const bookdata = postbooks.find({_subject: "math"});

        return math;
    },

    paymentid(id){
        var userid = id;

        const Userdata = postbooks.find({_id: "5fa36da96f237c75e6a58e92"})

        return true;
    },

    reporteduser(){
        var total;
        total = UserModel.find().count();
        total = 3;
        return total;
    }

}