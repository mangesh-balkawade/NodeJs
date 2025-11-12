const dotenv = require('dotenv');
const express = require("express");
const app = express();
const emailQueue = require("./queue2");

// app.post("/send", async (req, res) => {
//     try {
//         for (let i = 0; i < 6; i++) {
//             emailQueue.add({ to: "mangeshbalkawade219@gmail.com" });
//         }
//         return res.status(200).json({ message: "send email" });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error });
//     }
// });

// app.listen(3000, () => {
//     console.log("Server Is Running On Port 3000");
// });


