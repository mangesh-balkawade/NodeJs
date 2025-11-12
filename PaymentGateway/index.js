const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.listen(3000, (req, res) => {
    console.log("Server is runnig ");
});

mongoose.connect(process.env.MONGODB_URI_LOCAL).then(() => {
    console.log("Mongoose Connected");
}).catch(err => {
    console.log(err);
    console.log("Unable To Connect To The Server");
});

const payment = require("./routes/payment");
app.use(payment);
