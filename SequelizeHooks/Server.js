require('dotenv').config();

const express = require("express");
const app = express();
app.use(express.json());
require("./Association");
require("./ModelHooks/UserHooks");

const UserRoutes = require("./Routes/UserRoutes");
app.use(UserRoutes);


app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({
        message: "Unable To Process Request Dur To Server Issue",
        status: 500
    });
});

app.listen(3000, (req, res) => {
    console.log("Server Is Running On Port 3000");
});


