const express = require('express');
const router = express.Router();
const path = require('path');

const AuthController = require('../controllers/AuthController')

router.get('/signup', function(req, res, next){
    res.sendFile(path.join(__dirname ,  '../Signup.html'));
})

router.post('/signup', AuthController.register)
router.post('/', AuthController.login)
router.get('/logout', AuthController.logout);

module.exports = router