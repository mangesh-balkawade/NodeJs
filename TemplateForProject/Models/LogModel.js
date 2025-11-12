const { DataTypes } = require("sequelize");
const sequelize = require("../Config/SequelizeConfig");

const Log = sequelize.define(
    "Log",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        level: {
            type: DataTypes.STRING,
        },
        message: {
            type: DataTypes.STRING,
        },
        stack: {
            type: DataTypes.TEXT,
        },
    },
    {
        createdAt: true,
        updatedAt: true,
        timestamps: true,
    }
);

Log.sync({});

module.exports = Log;

