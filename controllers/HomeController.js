const express = require("express");
const path = require("path");
const router = express.Router();

router.use(express.static(__dirname + "/"));

const home = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../feed_2.0.html"));
};

module.exports = home;
