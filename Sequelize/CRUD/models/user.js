const { DataTypes } = require("sequelize");
const sequelize = require("../config.js");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    createdAt: false,
    updatedAt: false,
  }
);

// hibernate auto _ update sarkh ahe
sequelize.sync({ alter: true });

module.exports = User;
