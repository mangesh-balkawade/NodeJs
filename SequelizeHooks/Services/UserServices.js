const UserModel = require("../Models/UserModel");
const dbModel = UserModel;
const primaryKey = "userId";

module.exports = {
    async saveData(data) {
        let savedData = await dbModel.create(data);
        return savedData;
    },
    async getData() {
        let users = await dbModel.findAll();
        return users;
    }
}