const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostBook = new Schema({
    Title: {
        type: String
    },
    FName: {
        type: String
    },
    LName: {
        type: String
    },
    Publisher: {
        type: String
    },
    Edition: {
        type: String
    },
    Subject: {
        type: String
    },
    Condition: {
        type: String
    },
    Isbn: {
        type: Number
    },
    Description: {
        type: String
    },
    Price: {
        type: String
    },
    Image: {
        type: String
    },
    OwnerFname: {
        type: String
    },
    OwnerLname: {
        type: String
    },
    OwnerID:{
        type: String
    }

}, {timestamps: true});
var postbooks = mongoose.model('postbooks', PostBook);
module.exports = postbooks;