const express = require("express");
const app = express();
const session = require("express-session");
const PORT = 3000;
const Router = require("./router");

app.use(express);
app.use(express.urlencoded({ extended: true }));

app.use("view engine", "ejs");
app.use(Router);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`I LOVE You ${PORT}`);
});
