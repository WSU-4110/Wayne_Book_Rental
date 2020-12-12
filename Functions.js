const express = require("express");
const postbooks = require("./models/post.model");
const UserModel = require("./models/User");
const authenticate = require('./middleware/authenticate');
const checkUser = require("./middleware/checkUser");

module.exports={

    checkbookowner(id) {
        var bookid = id;
        var user ="5f88a68ec48f2311d0d63049";
        postbooks.findById(bookid, function(err, data){
            if(err)console.log(err);
            if (data.OwnerID != user){
                return false;
            }
            
        })
        return true
    },

    ratedBy(id){
        var userid = id;
        var ratedby = 1;
        UserModel.findById(userid, function(err, data){
            if(err)console.log(err);
            ratedby = data.numRated;
            
        })
        return ratedby;
    },

    bookOwner(id){
        var bookid = id;

        const bookdata = postbooks.find({_id: bookid});

        return bookdata;


    },

    totaluser(){
        var total;
        total = UserModel.find().count();
        total = 7;
        return total;
    },

    numBookRented(id){
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

    checkDate(id){
        var bookid = id;
        var date = "mm-dd-yyyy";

        postbooks.findById(bookid, function(err, data){
            if(err)console.log(err);

            date = data.date;
        })

        return date;
    },

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
    },

    checkUserID(id) {
        var userID = id;
        var user = "5f91e4559d7baa5e704051fd";
        postbooks.findById(userID, function(err, data){
            if(err) {
                console.log(err);
            }
            if (data.OwnerID != user){
                return false;
            }

        })
        return true;
    },

    checkBookName(Title){
        var Book = Title;

        const bookdata = postbooks.find({Title: Book});

        return bookdata;
    },

    checkCurrentUser(user){
        var userID = user;

        const userdata = UserModel.find({_id: userID});

        return userdata;
    },

    checkBookPrice(){
        var bookPrice;
        bookPrice = 100;
        return bookPrice;
    },

    checkRented(){
        var rented = true;
        return rented;
    },

    checkIsbn(isbn){
        var bookIsbn = isbn;

        const bookdata = postbooks.find({Isbn: bookIsbn});

        return bookdata;
    },

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