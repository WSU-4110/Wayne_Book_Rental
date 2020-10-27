const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

const { authenticate, checkUser} = require("../middleware/authenticate");

const createToken = (id) => {
  return jwt.sign({ id }, "verySecretValue", {
    expiresIn: "1h",
  });
};

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
          /*let token = jwt.sign({ name: user.name }, "verySecretValue", {
            expiresIn: "1h",
          });*/
          const token = createToken(user._id);
          res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 1000 });
          res.redirect("/feed");
          console.log("Logged in successfully!");
          console.log(token);
        } else {
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

const logout = (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = {
  register,
  login,
  logout,
};
