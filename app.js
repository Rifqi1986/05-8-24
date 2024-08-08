const express = require("express");
const app = express();
const session = require("express-session");
const PORT = 3000;
const router = require("./router");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(
  session({
    secret: "ini rahasia",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
