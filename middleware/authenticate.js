const jwt = require('jsonwebtoken');
const User = require('../models/User');


///////Checking for the token if it exits and checks the vality////////////////
const authenticate = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'verySecretValue', (err, decodedToken) =>{
            if(err){
                console.log(err.message);
                res.redirect('/');
            }
            else{
                //console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('/');
    }
}

module.exports = authenticate;