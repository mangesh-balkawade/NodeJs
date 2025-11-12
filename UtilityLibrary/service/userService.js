
const UserModel = require('../models/userModel');
const Repository = require("../utils/repository");

class UserService extends Repository {
    constructor() {
        super(UserModel, "deleteflag", true);
    }
}

let userService = new UserService();

module.exports = { userService };