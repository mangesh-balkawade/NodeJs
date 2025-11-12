const { DataTypes } = require("sequelize");
const sequelize = require("../Config/SequelizeConfig");
const Customer = require("./CustomerModel");
const AdminModel = require("./AdminModel");
const Orders = require("./OrderModel");
const BillModel = require("./BillModel");

const Payment = sequelize.define(
    "Payment",
    {
        paymentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        actualBill: {
            type: DataTypes.DECIMAL(10, 2)
        },

        payedBill: {
            type: DataTypes.DECIMAL(10, 2)
        },

        remainingBill: {
            type: DataTypes.DECIMAL(10, 2)
        },

        // Cancel | Deliver | Invoice Generated | Payed 
        paymentStatus: {
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
    Payment, {
    foreignKey: "customerId",
    sourceKey: "customerId",
    as: "payment"
});

Payment.belongsTo(
    Customer, {
    foreignKey: "customerId",
    sourceKey: "customerId",
    as: "customer"
});

BillModel.hasMany(
    Payment, {
    foreignKey: "billId",
    sourceKey: "billId",
    as: "bill"
});

Payment.belongsTo(
    BillModel, {
    foreignKey: "billId",
    sourceKey: "billId",
    as: "bill"
});

Payment.belongsTo(
    AdminModel,
    {
        foreignKey: "createdById",
        targetKey: "adminId",
        as: "createdBy"
    }
);

Payment.belongsTo(
    Orders,
    {
        foreignKey: "orderId",
        targetKey: "orderId",
        as: "order"
    }
);


Payment.sync({ alter: false });
BillModel.sync({ alter: false });

module.exports = Payment;

