const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("profile", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connection Has Been Established Successfully.");
} catch (error) {
  console.error("Unable To Connect To The Database:", error);
}

const Profile = sequelize.define("Profile", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileImage: {
    type: DataTypes.STRING(500),
  },
});

sequelize.sync({ alter: true });

module.exports = Profile;
