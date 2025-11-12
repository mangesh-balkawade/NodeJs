require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

require("./config/dbConfig");

const UserRoutes = require("./routes/userRoutes");

app.use("/User", UserRoutes);

require("./models/relationships");

app.listen(3000, () => {
  console.log("Server is started on 3000 port");
});
