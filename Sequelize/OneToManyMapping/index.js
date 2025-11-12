const express = require("express");
const routes = require("./routes/app");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.json());
app.use(express.json());

app.use(routes);

app.listen(3000, (req, res) => {
  console.log("Server Is STarted");
});
module.exports = app;
