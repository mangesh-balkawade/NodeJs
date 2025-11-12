const { DataTypes } = require("sequelize");
const sequelize = require("../Config/SequelizeConfig");

const Admin = sequelize.define(
    "Admin",
    {
        adminId: {
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
            allowNull: false,
            // unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
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

Admin.sync({ alter: false });

module.exports = Admin;

