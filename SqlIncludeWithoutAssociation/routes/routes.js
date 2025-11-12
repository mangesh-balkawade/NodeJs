const express = require("express");
const sequelize = require("../sequelize");// Assuming you have a common sequelize instance
const { QueryTypes } = require("sequelize");

const route = express.Router();

route.get("/getUsersWithPost", async (req, res) => {
    try {
        const data = await sequelize.query(
            `SELECT users.userId AS userId, users.name AS userName, posts.postId AS postId, posts.name AS postName FROM users LEFT JOIN posts ON users.userId = posts.userId`,
            {
                type: QueryTypes.SELECT,
            }
        );

        return res.status(200).json({ data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable To Get Data" });
    }
});

module.exports = route;
