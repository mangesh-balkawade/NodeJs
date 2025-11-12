const { userRepository } = require("../repository/userRepository");
const Service = require("../utils/service");

class UserService extends Service {
    constructor() {
        super(userRepository)
    }
}

let userService = new UserService();

module.exports = { userService };