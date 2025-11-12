const express = require("express");
const route = express.Router();
const AdminController = require("../Controllers/AdminController");
const { validateFields } = require("../Middlewares/ValidationMiddleware");
const JwtTokenMiddeleware = require("../Middlewares/JwtMiddleware");

const Controller = AdminController;
const RouteName = "Admin";

route.post(`/${RouteName}-Save`,
    validateFields(["password", "email", "name"]),
    Controller.saveData
);

route.post(`/${RouteName}-Login`,
    validateFields(["password", "email"]),
    Controller.login
);

route.patch(`/${RouteName}-Update`,
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
