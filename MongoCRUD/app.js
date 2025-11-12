const express = require("express");
const mongoose = require("mongoose");
const routes = require('./routes/routes.js')
const bodyParser = require('body-parser');

const app = express();

app.listen(5000, (req, res) => {
  console.log("Serve Startes on 5000");
});

app.use(routes)
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

database =
  "mongodb+srv://marvellous:marvellous@marvellous.ihqyjz4.mongodb.net/";


mongoose
  .connect(database)
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => {
    console.log(err);
    console.log("unable  to connect");
  });

