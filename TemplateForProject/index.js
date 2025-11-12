const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes Imports

const version = process.env.VERSION;

// Routes Definations

let enviroment = process.env.NODE_ENV;
var port = process.env.PORT;

switch (enviroment) {
    case "prodcution":
        port = process.env.PROD_PORT;
        break;
    case "development":
        port = process.env.DEV_PORT;
        break;
    case "local":
        port = process.env.LOCAL_PORT;
        break;
    default:
        port = process.env.DEV_PORT;
}


app.listen(port, () => {
    console.log(`Node js Server running on port no. ${port}`);
});
