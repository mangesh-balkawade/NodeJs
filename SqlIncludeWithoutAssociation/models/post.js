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
        },
        userId: { // Change from UserId to userId
            type: DataTypes.INTEGER,
            references: {
                model: 'Users', // Make sure this matches the actual table name of the User model
                key: 'userId',
            },
        }
    },
);

Post.sync({ alter: true });

module.exports = Post;

