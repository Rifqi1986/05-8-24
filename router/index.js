const router = require("express").Router();
const passport = require("passport");
const HomeController = require("../controllers/homeController");
const UserController = require("../controllers/userController");
// const express = require("express");
// const router = express.Router();

router.get("/", (req, res) => {
  res.send("Masuk ke router");
});

router.get("/register", UserController.renderRegisterPage);
router.post("/register", UserController.handleRegisterPage);
router.get("/login", UserController.renderLoginPage);
router.get("/home", HomeController.renderHome);



// router.post("/login", UserController.handleLogin); ini tidak digunakan lagi, karena menggunakan passport
router.post("/login", passport.authenticate("local",{
  successRedirect: "/home",
  failureRedirect: "/login",
  failureMessage: true
}))


module.exports = router;
