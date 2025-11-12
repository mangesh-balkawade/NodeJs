const { DataTypes } = require("sequelize");
const sequelize = require("../Config/SequelizeConfig");

const Driver = sequelize.define(
    "Driver",
    {
        driverId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        mobileNo: {
            type: DataTypes.STRING(40)
        },
        deleteFlag: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        }
    },
    {
        createdAt: true,
        updatedAt: true,
        timestamps: true,
    }
);

Driver.sync({});

module.exports = Driver;

