const Controller = require("../utils/controller");
const { userService } = require("../service/userService");

class UserController extends Controller {
  constructor() {
    super(userService, "userId", true);
  }
}

let userController = new UserController();

module.exports = { userController };
