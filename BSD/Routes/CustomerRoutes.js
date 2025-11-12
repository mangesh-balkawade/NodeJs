const express = require("express");
const route = express.Router();
const CustomerController = require("../Controllers/CustomerController");
const { validateFields } = require("../Middlewares/ValidationMiddleware");
const JwtTokenMiddeleware = require("../Middlewares/JwtMiddleware");

const Controller = CustomerController;
const RouteName = "Customer";

route.post(`/${RouteName}-Save`,
    JwtTokenMiddeleware,
    validateFields(["name", "email", "taluka", "city", "villageName", "address", "mobileNo"]),
    Controller.saveData
);

route.patch(`/${RouteName}-Update/:id`,
    JwtTokenMiddeleware,
    Controller.updateData
);

route.get(`/${RouteName}-GetAllData`,
    JwtTokenMiddeleware,
    Controller.getData
);

route.delete(`/${RouteName}-Delete/:id`,
    JwtTokenMiddeleware,
    Controller.deleteData
);

module.exports = route;
