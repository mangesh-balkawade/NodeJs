
const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");
const Role = require("./roles");
const UserRole = require("./userrole");

const User = sequelize.define(
    "User",
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }
    },
);

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

// sequelize.sync({ alter: true });

module.exports = User;

