const express = require("express");
const route = express.Router();
const DriverController = require("../Controllers/DriverController");
const { validateFields } = require("../Middlewares/ValidationMiddleware");
const JwtTokenMiddeleware = require("../Middlewares/JwtMiddleware");

const Controller = DriverController;
const RouteName = "Driver";

route.post(`/${RouteName}-Save`,
    JwtTokenMiddeleware,
    validateFields(["name"]),
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
