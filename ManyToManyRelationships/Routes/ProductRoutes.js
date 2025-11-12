const ProductController = require('../Controllers/ProductController');
const Controller = ProductController;
const express = require('express');
const route = express.Router();

route.post(
    "/Save-Product",
    Controller.saveData
);

route.get(
    "/Get-Products",
    Controller.getProducts
)

module.exports = route;