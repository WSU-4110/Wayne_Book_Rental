const express = require('express');
const router = express.Router();
const path = require('path');

//const HomeController = require('../controllers/HomeController');
const authenticate = require('../middleware/authenticate')

//router.get('/home', authenticate, HomeController.home);
router.get('/home', authenticate, function(req, res, next){
    res.sendFile(path.join(__dirname ,  '../feed_2.0.html'));
})

module.exports = router;