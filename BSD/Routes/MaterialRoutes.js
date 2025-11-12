const express = require("express");
const route = express.Router();
const MaterialController = require("../Controllers/MaterialController");
const { validateFields } = require("../Middlewares/ValidationMiddleware");
const JwtTokenMiddeleware = require("../Middlewares/JwtMiddleware");

const Controller = MaterialController;
const RouteName = "Material";

route.post(`/${RouteName}-Save`,
    JwtTokenMiddeleware,
    validateFields(["name", "unit", "price"]),
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
