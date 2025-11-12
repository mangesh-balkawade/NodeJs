const Post = require("./post");
const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

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

User.hasMany(
    Post,
    {
        foreignKey: "userId",
    }
);

Post.belongsTo(
    User,
    {
        foreignKey: "userId"
    }
);

// User.sync({ alter: true });
// Post.sync({ alter: true });

module.exports = User;

