const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("hurtyhelper", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connection Has Been Established Successfully.");
} catch (error) {
  console.error("Unable To Connect To The Database:", error);
}

module.exports = sequelize;
