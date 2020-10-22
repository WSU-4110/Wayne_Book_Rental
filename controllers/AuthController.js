const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

const authenticate = require("../middleware/authenticate");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    let user = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hashedPass,
      phone: req.body.Phonenumber,
    });

    user
      .save()
      .then((user) => {
        res.redirect("/");
        console.log("User added successfully!");
      })
      .catch((error) => {
        res.json({
          message: "An error occured",
        });
      });
  });
};

const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ $or: [{ email: username }] }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.join({
            error: err,
          });
        }
        if (result) {
          let token = jwt.sign({ name: user.name }, "verySecretValue", {
            expiresIn: "1h",
          });
          //res.redirect('/home');
          res.sendFile(path.join(__dirname, "../feed_2.0.html"));
          console.log("Logged in successfully!");
          console.log(token);
        } else {
          //res.redirect('/');
          //console.log('Password did not match');
          res.json({
            message: "Password did not match!",
          });
        }
      });
    } else {
      res.json({
        message: "No user found!",
      });
    }
  });
};

module.exports = {
  register,
  login,
};
