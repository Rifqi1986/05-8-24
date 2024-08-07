const bcrypt = require("bcrypt");
const db = require("../lib/db");

class UserController {
  static renderRegisterPage(req, res) {
    res.render("register");
  }

  static async handleRegisterPage(req, res) {
    try {
      const userName = req.body.nameuser;
      const password = req.body.password;

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const inputUser = {
        username: userName,
        password: hash,
        created_at: new Date(),
        updated_at: new Date(),
      };

      console.log(inputUser, "===> THIS FINAL");
      const insertData = await db("users").insert(inputUser);

      console.log(insertData, "==> FINAL TWO");
      // if (insertData.length >= 1) {
      //   res.redirect("/login");
      // } else {
      //   console.log("masuk ke Tidak Ada Datanya");

      //   throw new Error("Bad Request");
      // }
    } catch (error) {
      console.log(error, "===> error 33");
      res.status(500).json(error);
    }
  }

  static renderLoginPage(req, res) {
    res.render("login");
  }
}

module.exports = UserController;
