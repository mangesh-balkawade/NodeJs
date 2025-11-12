const { DataTypes } = require("sequelize");
const sequelize = require("../Config/SequelizeConfig");
const Customer = require("./CustomerModel");
const BillLineItems = require("./BillLineItems");
const AdminModel = require("./AdminModel");
const Orders = require("./OrderModel");

const Bill = sequelize.define(
    "Bills",
    {
        billId: {
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
        billStatus: {
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
    Bill, {
    foreignKey: "customerId",
    sourceKey: "customerId",
    as: "bills"
});

Bill.belongsTo(
    Customer, {
    foreignKey: "customerId",
    sourceKey: "customerId",
    as: "customer"
});

Bill.hasMany(
    BillLineItems, {
    foreignKey: "billId",
    sourceKey: "billId",
    as: "billLineItems"
});

BillLineItems.belongsTo(
    Bill, {
    foreignKey: "billId",
    sourceKey: "billId",
    as: "bills"
});

Bill.belongsTo(
    AdminModel,
    {
        foreignKey: "createdById",
        targetKey: "adminId",
        as: "createdBy"
    }
);

Bill.belongsTo(
    Orders,
    {
        foreignKey: "orderId",
        targetKey: "orderId",
        as: "order"
    }
);


Bill.sync({ alter: false });
BillLineItems.sync({ alter: false });

module.exports = Bill;

