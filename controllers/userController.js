const bcrypt = require("bcrypt");

class UserController {
  static renderRegisterPage(req, res) {
    res.render("register");
  }
  static async handleRegisterPage(req, res) {
    try {
      const userName = req.body.nameUser;
      const password = req.body.password;

      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(Password, salt);

      const inputUser = {
        nameUser: userName,
        password: hash,
        created_at: new Data(),
        updated_at: new data(),
      };
    } catch (error) {}

    console.log(inputUser, "===> THIS FINAL");
    const insertData = await db("Users").insert(inputUser);
  }
}

module.exports = UserController;
