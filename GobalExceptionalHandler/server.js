// const express = require("express");
// const app = express();
// app.use(express.json());

// app.get("/getUsers", async (req, res) => {
//     next(new Error("Hi"))
// })

// app.use((err, req, res, next) => {
//     console.log(err);
//     return res.status(500).json({
//         message: "Internal Server Error",
//         status: 500
//     })
// });

// app.listen(3000, () => console.log("Server Is Running At 3000"));

const express = require("express");
const app = express();
app.use(express.json());

app.get("/getUsers", async (req, res) => {
    throw new Error("Hi"); // No need for `next` here
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err);
    return res.status(500).json({
        message: "Internal Server Error",
        status: 500
    });
});

app.listen(3000, () => console.log("Server Is Running At 3000"));
