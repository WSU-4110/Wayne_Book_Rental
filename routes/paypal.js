const express = require("express");
var multer = require("multer");
const router = express.Router();
const path = require("path");
const paypal = require("paypal-rest-sdk");
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
  
const PaypalID = process.env.PAYPAL_Client_Id;
const PaypalSecret = process.env.PAYPAL_Client_Secret;
const PostBook = require("../models/post.model");
const UserModel = require("../models/User");
const authenticate = require("../middleware/authenticate");
const checkUser = require("../middleware/checkUser");
const { send } = require("@sendgrid/mail");

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': PaypalID,
    'client_secret': PaypalSecret
});

router.post('/pay/:id',authenticate, checkUser, (req, res)=>{

    var ID = req.params.id;
    var BookPrice;
    var Bookname;
    var OwnerID;
    var OwnerBalance;


    PostBook.findById(ID, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var BookPrice = data.Price;
            var OwnerID = data.OwnerID;
            var Bookname = data.Bookname;
            data.Rented = true;
            data.save();
        }
        UserModel.findById(OwnerID,function(err, data){
            if(err){
                console.log(err)
            }
            else{

                OwnerBalance = Number(data.Wallet);
                var NewBalance = Number(OwnerBalance) + Number(BookPrice);
                console.log(NewBalance + "is the new balance");
                data.Wallet = NewBalance;
                data.save();
                
                var create_payment_json = {
                    "intent": "sale",
                    "payer": {
                        "payment_method": "paypal"
                    },
                    "redirect_urls": {
                        "return_url": "http://localhost:4000/success/" + BookPrice,
                        "cancel_url": "http://localhost:4000/profile"
                    },
                    "transactions": [{
                        "item_list": {
                            "items": [{
                                "name": Bookname,
                                "sku": "001",
                                "price": BookPrice,
                                "currency": "USD",
                                "quantity": 1
                            }]
                        },
                        "amount": {
                            "currency": "USD",
                            "total": BookPrice
                        },
                        "description": "Payment for " + Bookname
                    }]
                };
                
                paypal.payment.create(create_payment_json, function (error, payment) {
                    if (error) {
                        throw error;
                    } else {
                        console.log(payment);
                        for(let i = 0; i < payment.links.length;i++){
                            if(payment.links[i].rel === 'approval_url'){
                                res.redirect(payment.links[i].href);
                            }
                        }
                    }
                });
            }

        })
    
        
    })
});

router.get('/success/:price',authenticate, checkUser, (req, res) =>{
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const BookPrice = req.params.price;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": BookPrice
            }
        }]
    }

    paypal.payment.execute(paymentId, execute_payment_json, function(err, payment){
        if(err){
            console.log(err.response);
            throw err;
        }
        else{
            res.redirect('/feed');
        }
    })
});

router.post('/payout/:id',authenticate, checkUser, (req, res) =>{
    var ID = req.params.id;
    console.log(ID);

    UserModel.findById(ID, function(err, data){
        if(err){
            console.log(err);
        }
        var Balance = Number(data.Wallet);
        var Email = data.email;
        data.Wallet = Number(0);
        console.log(data.Wallet);
        data.save();

        var create_payment_json = {
            "sender_batch_header": {
                "email_subject": "You have reedemed money from Wayne Book Rental on your way!",
                "recipient_type": "EMAIL"
            },
            "items": [
                {
                    "recipient_type": "EMAIL",
                    "amount": {
                        "value": Balance,
                        "currency": "USD"
                    },
                    "note": "Thanks for your business with us",
                    "receiver": Email
                }
            ]
        };
    
        paypal.payout.create(create_payment_json, function (err, data) {
            if (err) console.log("ERRRRR", err);
            console.log("Create Payment Response");
            console.log(data);
            //res.send("Success");
        });
    })
    res.redirect("/profile");

    

});

router.post('/WBRWallet/:id', authenticate, checkUser, (req, res)=>{
    var ID = req.params.id;
    var UserID = res.locals.user._id

    PostBook.findById(ID, function(err, data){
        if(err){
            console.log(err);
        }
        var BookPrice = data.Price;
        var OwnerID = data.OwnerID;
        data.Rented = true;
        data.save();
        UserModel.findById(OwnerID, function(err, data){
            if(err){
                console.log(err)
            }
            
            OwnerBalance = Number(data.Wallet);
            var NewBalance = Number(OwnerBalance) + Number(BookPrice);
            console.log(NewBalance + " is the new balance");
            data.Wallet = NewBalance;
            data.save();
            
        })
        UserModel.findById(UserID, function(err, data){
            var UserBalance = Number(data.Wallet);
            var NewUserBalance = Number(UserBalance) - Number(BookPrice)
            data.Wallet = NewUserBalance;
            data.save(); 
        })
    })

    res.redirect('/feed');
})

module.exports = router;


  
  