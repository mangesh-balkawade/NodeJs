const express = require("express");
const route = express.Router();
const BillController = require("../Controllers/BillController");
const { validateFields } = require("../Middlewares/ValidationMiddleware");
const JwtTokenMiddeleware = require("../Middlewares/JwtMiddleware");

const Controller = BillController;
const RouteName = "Customer-Bills";

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
    Controller.updateBillLineItems
);

module.exports = route;
