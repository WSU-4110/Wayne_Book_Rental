const express = require("express");
const postbooks = require("./models/post.model");
const UserModel = require("./models/User");
const authenticate = require('./middleware/authenticate');
const checkUser = require("./middleware/checkUser");

module.exports={

    checkCurrentRating(id) {
        var userid = id;
        var user ="5f88a68ec48f2311d0d63049";
        postbooks.findById(userid, function(err, data){
            if(err)console.log(err);
            if (data.OwnerID != user){
                return false;
            }
            
        })
        return true
    },

    checkRated(id){
        var userid = id;
        var ratedby = 1;
        UserModel.findById(userid, function(err, data){
            if(err)console.log(err);
            ratedby = data.numRated;
            
        })
        return ratedby;
    },

    checkAuthentication(id){
        var userid = id;

        const bookdata = postbooks.find({_id: userid});

        return bookdata;


    },

    checkID(){
        var total;
        total = UserModel.find().count();
        total = 7;
        return total;
    },

    checkNumber(id){
        var userid = id;
        var number = 2;
        UserModel.findById(userid, function(err, data){
            if(err){
                console.log(err);
            }

            number = data.num 

        })
        return number;
    },

    checkTotalUsers(id){
        var userid = id;
        var date = "mm-dd-yyyy";

        postbooks.findById(userid, function(err, data){
            if(err)console.log(err);

            date = data.date;
        })

        return date;
    }

}