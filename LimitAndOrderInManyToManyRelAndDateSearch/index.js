const express = require("express");
const User = require("./user");
const Post = require("./post");
const Address = require("./address");
const { Op, fn, col, literal } = require("sequelize");
const app = express();
app.use(express.json());

app.get("/get-data", async (req, res) => {
    try {
        let data = await User.findAll({
            where: {
                userId: 1
            },
            include: [
                {
                    model: Post,
                    as: "posts",
                    limit: 1,
                    order: [["postId", "DESC"]]
                },
                {
                    model: Address,
                    as: "address",
                    order: [["addressId", "DESC"]],
                    limit: 1
                }
            ]
        });
        return res.status(200).json({
            data
        })
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({
            error
        })
    }
})

app.get("/get-data/:searchBy/:searchBy2", async (req, res) => {
    try {
        let { searchBy, searchBy2 } = req.params;
        let data = await User.findAll({
            where: {
                [Op.and]: [
                    literal(`DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') LIKE '%${searchBy}%'`)
                ],
                name: {
                    [Op.like]: `%${searchBy2}%`
                }
            },
        });
        return res.status(200).json({
            data
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({
            error
        });
    }
});


app.listen(3000, () => {
    console.log("server started on 3000");
})