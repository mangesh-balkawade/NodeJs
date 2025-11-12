const { DataTypes } = require("sequelize");
const sequelize = require("../Config/SequelizeConfig");

const Customer = sequelize.define(
    "Customer",
    {
        customerId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        mobileNo: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        villageName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        taluka: {
            type: DataTypes.STRING(50),
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

Customer.sync({});

module.exports = Customer;

