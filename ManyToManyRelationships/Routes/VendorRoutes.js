const VendorController = require('../Controllers/VendorController');
const Controller = VendorController;
const express = require('express');
const route = express.Router();

route.post(
    "/Save-Vendor",
    Controller.saveData
);

module.exports = route;