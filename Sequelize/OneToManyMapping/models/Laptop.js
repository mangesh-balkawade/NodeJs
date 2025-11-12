const sequelize = require("../config");
const { DataTypes } = require("sequelize");
const Employee = require("./Employee");

const Laptop = sequelize.define("Laptop", {
  lid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  lname: {
    type: DataTypes.STRING,
  },
});

Employee.hasMany(Laptop, {
  foreignKey: "eid",
});

Laptop.belongsTo(Employee, {
  foreignKey: "eid",
});
// hibernate auto _ update sarkh ahe
sequelize.sync({ alter: true });
module.exports = Laptop;
