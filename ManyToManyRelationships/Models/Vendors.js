const sequelize = require('../sequelize_db');
const { DataTypes } = require('sequelize');

const Vendor = sequelize.define(
    "Vendors",
    {
        vendorId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        vendorName: {
            type: DataTypes.STRING
        },

        vendorEmail: {
            type: DataTypes.STRING
        },

        country: {
            type: DataTypes.STRING
        },

        rating: {
            type: DataTypes.FLOAT
        }
    },
    {
        createdAt: true,
        updatedAt: true,
        timestamps: true
    }
);

Vendor.sync();

module.exports = Vendor;