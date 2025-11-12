const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");

router.post("/User-Save",
    UserController.saveUser
);

module.exports = router;