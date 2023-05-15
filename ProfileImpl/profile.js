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
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileImage: {
    type: DataTypes.BLOB("long"),
    length: "long",
  },
});



sequelize.sync({ alter: true });

module.exports=Profile