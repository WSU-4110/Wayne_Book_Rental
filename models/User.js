const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
   fname: {
       type: String
   },
   lname: {
       type: String
   },
   email: {
       type: String
   },
   password: {
       type: String
   },
   phone: {
       type: String
   },
   rating: {
       type: Number,
       default: 0
   },
   numRated:{
        type: Number,
        default: 0
   },
   ratedby: [{type:String, ref:"userSchema"}],
   Wallet:{
       type: Number,
       default: 0.00
   },
   wishlist: [{type:String, ref:"PostBook"}]
   

}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;