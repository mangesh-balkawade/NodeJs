const { Sequelize } = require("sequelize");

var database = "sequelize_hooks";
var user = "root";
var passwrod = "";
var host = "localhost";

const sequelize = new Sequelize(database, user, passwrod, {
    host: host,
    dialect: "mysql",
});

try {
    sequelize.authenticate();
    console.log("Connection Has Been Established Successfully.");
} catch (error) {
    console.error("Unable To Connect To The Database:", error);
}

module.exports = sequelize;
