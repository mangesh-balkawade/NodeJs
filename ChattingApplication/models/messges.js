const sequelize = require("../conf");
const { DataTypes, Sequelize } = require("sequelize");

const Message = sequelize.define("Message", {
  messageId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  empId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  custId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  sender: {
    type: DataTypes.STRING,
  },

  chatMessage: {
    type: DataTypes.TEXT,
  },

  timestamp: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

sequelize.sync({});

module.exports = Message;
