const express = require("express");
const route = express.Router();
const OrderController = require("../Controllers/OrderController");
const { validateFields } = require("../Middlewares/ValidationMiddleware");
const JwtTokenMiddeleware = require("../Middlewares/JwtMiddleware");

const Controller = OrderController;
const RouteName = "Customer-Orders";

route.post(`/${RouteName}-Save`,
    JwtTokenMiddeleware,
    validateFields(["customerId", "cgst", "sgst"]),
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

route.patch(`/${RouteName}-LineItems-Update/:id`,
    JwtTokenMiddeleware,
    Controller.updateOrderLineItems
);

module.exports = route;
