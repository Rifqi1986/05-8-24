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
      const insertData = await db("users").insert(inputUser).returning("id");
      console.log(insertData, "==> Hasil Insert");

      if (insertData.length >= 1) {
        res.redirect("/login");
      } else {
        console.log("masuk ke Tidak Ada Datanya");
        
        throw new Error("Bad Request");
      }
      
      console.log(insertData, "==> FINAL TWO");
    } catch (error) {
      console.log(error, "===> This Is Error");
      res.status(500).json(error);
    }
  }
  
  static renderLoginPage(req, res) {
    let message = ""
    
    if(req.session) {
      if(req.session.message) {
        message = req.session.message[0]
        req.session.message = null // ini harus di reassign dengan falsy lagi
      }
    }
    res.render("login", {data: message})
  }

  static async handleLogin(req, res) {
    try {
      const { nameuser, password } = req.body;
      const dataUser = await db("users").where({ username: nameuser }).first(); // ini untuk cek username ada atau tidak

      console.log(dataUser);

      if (dataUser) {
        const passwordMatch = bcrypt.compareSync(password, dataUser.password);
        console.log(passwordMatch);

        if (passwordMatch) {
          res.redirect("/home");
        } else {
          res.redirect("/login");
        }
      } else {
        console.log("Password/email is wrong");
      }
    } catch (error) {}
  }
}
module.exports = UserController;
