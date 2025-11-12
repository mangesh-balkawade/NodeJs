const express = require("express");
const route = express.Router();
const VehicleController = require("../Controllers/VehicleController");
const { validateFields } = require("../Middlewares/ValidationMiddleware");
const JwtTokenMiddeleware = require("../Middlewares/JwtMiddleware");

const Controller = VehicleController;
const RouteName = "Vehicle";

route.post(`/${RouteName}-Save`,
    JwtTokenMiddeleware,
    validateFields(["name", "no"]),
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
