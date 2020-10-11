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
    }

});
var postbooks = mongoose.model('postbooks', PostBook);
module.exports = postbooks;