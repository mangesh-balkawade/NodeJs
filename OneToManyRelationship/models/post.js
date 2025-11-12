const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Post = sequelize.define(
    "Post",
    {
        postId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }
    },
);

module.exports = Post;

