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

const AdminRoutes = require("./Routes/AdminRoutes");
const DriverRoutes = require("./Routes/DriverRoutes");
const VehicleRoutes = require("./Routes/VehicleRoutes");
const MaterialRoutes = require("./Routes/MaterialRoutes");
const CustomerRoutes = require("./Routes/CustomerRoutes");
const OrderRoutes = require("./Routes/OrderRoutes");

const version1 = process.env.VERSION1;

// Routes Definations
app.use(`/${version1}`, AdminRoutes);
app.use(`/${version1}`, DriverRoutes);
app.use(`/${version1}`, VehicleRoutes);
app.use(`/${version1}`, MaterialRoutes);
app.use(`/${version1}`, CustomerRoutes);
app.use(`/${version1}`, OrderRoutes);

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

// Handling unmatched routes
app.use("*", (req, res) => {
    res.status(404).json({
        message: "The URL you entered is wrong. Please provide a valid URL.",
        url: req.originalUrl
    });
});

app.listen(port, () => {
    console.log(`Node js Server running on port no. ${port}`);
});
