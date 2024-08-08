const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("./db");

const authenticate = (username, password, done) => {
  db("users")
    .where({ username })
    .first()
    .then((user) => {
      console.log(user, "==> data terpilih");

      if (!user) {
        return done(null, false, { message: "username/password salah" });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return done(null, false, { message: "username/password salah" });
      }

      return done(null, user);
    })
    .catch((err) => {
      console.log(err, "==> ini error");
      return done(err);
    });
};

passport.use(
  new localStrategy(
    {
      usernameField: "nameuser", // Ini harus sama dengan yg ada di HTML halaman Login
      passwordField: "password",
    },
    authenticate
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db("users")
    .where({ id })
    .first()
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      return done(err, null);
    });
});
