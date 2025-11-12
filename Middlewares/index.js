const express = require("express");
const app = express();

const middleware = (req, res, next) => {
    console.log("middleware started");
    //next(); // it will hang the system.
}

app.get("/middleware-test", middleware, (req, res) => {
    return res.status(200).json({
        data: "hi"
    });
})

app.listen((3000), () => {
    console.log("server started ");
})