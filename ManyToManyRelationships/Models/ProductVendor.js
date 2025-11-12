const sequelize = require('../sequelize_db');
const { DataTypes } = require('sequelize');

// Add Id By OurSelf Due To Keys Issue In Many To Many Relationships.

const ProductVendor = sequelize.define(
    "ProductVendor",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        createdAt: true,
        updatedAt: true,
        timestamps: true
    }
);


module.exports = ProductVendor;