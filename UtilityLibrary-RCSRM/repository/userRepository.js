const UserModel = require("../models/userModel");
const Repository = require("../utils/repository");

class UserRepository extends Repository {
    constructor() {
        super(UserModel, "deleteFlag", true);
    }
}

const userRepository = new UserRepository();

module.exports = { userRepository };