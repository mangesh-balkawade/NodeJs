const { DataTypes } = require("sequelize");
const sequelize = require("../Config/SequelizeConfig");

const Vehicle = sequelize.define(
    "Vehicle",
    {
        vehicleId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        no: {
            type: DataTypes.STRING(100),
            allowNull: false
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

Vehicle.sync({});

module.exports = Vehicle;

