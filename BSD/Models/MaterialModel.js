const { DataTypes } = require("sequelize");
const sequelize = require("../Config/SequelizeConfig");

const Material = sequelize.define(
    "Material",
    {
        materialId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        code: {
            type: DataTypes.STRING(40)
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        unit: {
            type: DataTypes.STRING(50),
            allowNull: false
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

Material.sync({});

module.exports = Material;

