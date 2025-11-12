const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const UserModel = sequelize.define(
    "User",
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(100),
        },
        age: {
            type: DataTypes.INTEGER
        },

        deleteflag: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        }
    },
    {
        createdAt: true,
        updatedAt: true,
        timestamps: true
    }
);

module.exports = UserModel;