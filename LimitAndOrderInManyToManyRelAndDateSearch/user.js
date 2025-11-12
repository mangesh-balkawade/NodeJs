const { DataTypes } = require("sequelize");
const { sequelize } = require("./sequelize");

const User = sequelize.define(
    "user",
    {
        userId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        }
    },
    {
        createdAt: true,
        timestamps: true,
        updatedAt: true
    }
);

User.sync();

module.exports = User;