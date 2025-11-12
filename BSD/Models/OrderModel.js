const { DataTypes } = require("sequelize");
const sequelize = require("../Config/SequelizeConfig");
const Customer = require("./CustomerModel");
const OrderLineItems = require("./OrderLineItemsModel");
const AdminModel = require("./AdminModel");

const Orders = sequelize.define(
    "Orders",
    {
        orderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        totalAmount: {
            type: DataTypes.DECIMAL(10, 2)
        },

        sgst: {
            type: DataTypes.INTEGER
        },
        cgst: {
            type: DataTypes.INTEGER
        },
        grossAmount: {
            type: DataTypes.DECIMAL(10, 2)
        },

        discount: {
            type: DataTypes.DECIMAL(8, 2)
        },

        // Cancel | Deliver | Invoice Generated | Payed 
        orderStatus: {
            type: DataTypes.STRING(50)
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

Customer.hasMany(
    Orders, {
    foreignKey: "customerId",
    sourceKey: "customerId",
    as: "orders"
});

Orders.belongsTo(
    Customer, {
    foreignKey: "customerId",
    sourceKey: "customerId",
    as: "customer"
});

Orders.hasMany(
    OrderLineItems, {
    foreignKey: "orderId",
    sourceKey: "orderId",
    as: "orderLineItems"
});

OrderLineItems.belongsTo(
    Orders, {
    foreignKey: "orderId",
    sourceKey: "orderId",
    as: "orders"
});

Orders.belongsTo(
    AdminModel,
    {
        foreignKey: "createdById",
        targetKey: "adminId",
        as: "createdBy"
    }
)


Orders.sync({ alter: false });
Customer.sync({});
OrderLineItems.sync({ alter: false });

module.exports = Orders;

