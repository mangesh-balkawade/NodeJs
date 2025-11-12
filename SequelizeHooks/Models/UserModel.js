const sequelize = require("../DBConfig");
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
            type: DataTypes.STRING(50),
            allowNull: false
        }
    },
    {
        createdAt: true,
        updatedAt: true,
        timestamps: true
    }
);

module.exports = User;