
const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
    "User",
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }
    },
);


User.sync({ alter: false });

module.exports = User;

