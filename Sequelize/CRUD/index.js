const express = require("express");
const app = express();
const port = 3000;
const routes = require("./api/api.js");
const parser = require("body-parser");

app.use(parser.json());
app.use(express.json());
app.use(routes);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
