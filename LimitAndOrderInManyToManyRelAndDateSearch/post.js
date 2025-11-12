const { DataTypes } = require("sequelize");
const { sequelize } = require("./sequelize");
const User = require("./user");

const Post = sequelize.define(
    "post",
    {
        postId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        comment: {
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
    Post,
    {
        as: "posts"
    }
);

Post.belongsTo(
    User,
    {
        as: "user"
    }
)

Post.sync();

module.exports = Post;