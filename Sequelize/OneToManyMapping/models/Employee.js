const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Employee = sequelize.define("Employee", {
  eid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

// hibernate auto _ update sarkh ahe
sequelize.sync({ alter: true });
module.exports = Employee;
