const express = require("express");
const UserModel = require("./models/User");
const postbooks = require("./models/post.model");
const authenticate = require("./middleware/authenticate");
const checkUser = require("./middleware/checkUser");
const { post } = require("./routes/post");

module.exports = {
    
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
    }


}