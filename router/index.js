const router = require("express").Router();
const UserController = require("../controllers/userController");
// const express = require("express");
// const router = express.Router();

router.get("/", (req, res) => {
  res.send("Masuk ke router");
});

router.get("/register", UserController.renderRegisterPage);
router.post("/register", UserController.handleRegisterPage);
router.get("/login", UserController.renderLoginPage);

module.exports = router;
