const express = require("express");
const route = express.Router();
const paymentController = require("../controllers/paymentController")

route.post("/api/checkout", paymentController.checkOut);
route.post("/api/paymentverification", paymentController.paymentVerified);
route.get("/api/getkey",paymentController.getKey);

module.exports = route;