const router = require("express").Router();
// const express = require("express");
// const router = express.Router();

router.get("/", (req, res) => {
  res.send("Masuk ke Route");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  res.render("register");
});

module.exports = router;
