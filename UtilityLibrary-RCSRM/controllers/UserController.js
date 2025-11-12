const Controller = require("../utils/controller");
const { userService } = require("../service/userService");
const sequelize = require("../config/dbConfig");

class UserController extends Controller {
  constructor() {
    super(userService, true);
  }

  test = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      let data = await userService.getDataWithPagination(null, 1, 10, null, "name", "ASc", "", [], null, false)

      await transaction.commit();

      return res.status(200).json({ data });
    }
    catch (error) {
      console.log(error);

      return res.status(500).json({ error })
    }
  }
}

let userController = new UserController();

module.exports = { userController };
