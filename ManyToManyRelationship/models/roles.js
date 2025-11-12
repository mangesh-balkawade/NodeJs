
const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Role = sequelize.define(
    "Role",
    {
        roleId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }
    },
);

module.exports = Role;

