const LogModel = require("../Models/LogModel");
const Messages = require('../Helpers/Messages');

module.exports = {

    async saveLog(error, level = "info") {
        if (error) {
            console.log(error);
            
            let log = {
                message: error.message,
                stack: error.stack,
                level
            };

            await LogModel.create(log);
        }
    }

}