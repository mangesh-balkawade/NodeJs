const { DataTypes } = require("sequelize");
const sequelize = require("../Config/SequelizeConfig");
const AdminModel = require("./AdminModel");


const PaymentLog = sequelize.define(
    "PaymentLog",
    {
        paymentLogId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        paidBill: {
            type: DataTypes.DECIMAL(10, 2)
        },

        transactionId: {
            type: DataTypes.STRING(100),
        },

        paymentType: {
            type: DataTypes.STRING(100),
        },

        payedDate: {
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

