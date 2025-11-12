const { DataTypes } = require("sequelize");
const sequelize = require("../Config/SequelizeConfig");
const DriverModel = require("./DriverModel");
const Vehicle = require("./VehicleModel");
const MaterialModel = require("./MaterialModel");

const OrderLineItems = sequelize.define(
    "OrderLineItems",
    {
        orderLineItemId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        quantity: {
            type: DataTypes.INTEGER,
        },

        standerdRate: {
            type: DataTypes.DECIMAL(8, 2)
        },

        rate: {
            type: DataTypes.DECIMAL(8, 2),
        },

        price: {
            type: DataTypes.DECIMAL(10, 2)
        },

        status: {
            type: DataTypes.STRING(50)
        },

        deliveredOn: {
            type: DataTypes.DATE
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

OrderLineItems.belongsTo(
    DriverModel,
    {
        foreignKey: "driverId",
        targetKey: "driverId",
        as: "deliveredByDriver"
    }
);

OrderLineItems.belongsTo(
    Vehicle,
    {
        foreignKey: "vehicleId",
        targetKey: "vehicleId",
        as: "deliveredByVehicle"
    }
);

OrderLineItems.belongsTo(
    MaterialModel,
    {
        foreignKey: "materialId",
        targetKey: "materialId",
        as: "material"
    }
);

OrderLineItems.sync({ alter: false });
module.exports = OrderLineItems;