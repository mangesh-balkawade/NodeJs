const Post = require("./post");
const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Comment = sequelize.define(
    "Comment",
    {
        commentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: DataTypes.STRING
        }
    },
);

Post.hasMany(
    Comment,
    {
        foreignKey: "postId"
    }
);

Comment.belongsTo(
    Post,
    {
        foreignKey: "postId"
    }
);

Post.sync({ alter: true });
Comment.sync({ alter: true });

module.exports = Comment;

