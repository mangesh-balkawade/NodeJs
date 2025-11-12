const sequelize = require('../sequelize_db');
const { DataTypes } = require('sequelize');

const Product =  sequelize.define(
    "Product",
    {
        productId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        productName: {
            type: DataTypes.STRING
        },

    },
    {
        createdAt: true,
        updatedAt: true,
        timestamps: true
    }
);

Product.sync();

module.exports = Product;