const express = require("express");
const route = express.Router();
const { userController } = require("../controllers/UserController");

route.post("/User-Save", userController.saveData);

route.patch("/User-Update/:id", userController.updateData);

route.delete("/User-Delete/:id", userController.deleteData);

route.get("/User-Get-Data-By-Id/:id", userController.getDataById);

route.get("/User-Get-All-Data", userController.getAllData);

route.get("/User-Get-All-Data-By-Pagination", userController.getAllDataWithPagination);

module.exports = route;
