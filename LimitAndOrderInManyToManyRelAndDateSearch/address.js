const { DataTypes } = require("sequelize");
const { sequelize } = require("./sequelize");
const User = require("./user");

const Address = sequelize.define(
    "Address",
    {
        addressId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        }
    },
    {
        createdAt: true,
        timestamps: true,
        updatedAt: true
    }
);

User.hasMany(
    Address,
    {
        as: "address"
    }
);

Address.belongsTo(
    User,
    {
        as: "user"
    }
)

Address.sync();

module.exports = Address;