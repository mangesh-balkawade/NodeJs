const express = require("express");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const route = express.Router();

route.get(
    "/getUsersWithPost",
    async (req, res) => {
        try {
            let data = await User.findAll(
                {
                    include: [
                        {
                            model: Post,
                            include: [
                                {
                                    model: Comment,
                                    // required: true
                                }
                            ]
                        }
                    ]
                }
            );
            return res.status(200).json({ data });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Unable To Get Data" });
        }
    }
);

module.exports = route;