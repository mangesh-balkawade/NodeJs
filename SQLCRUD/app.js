express = require("express");
router = require("./api/api.js");
const cors = require("cors");
const bodyParser = require("body-parser");

app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(router);
app.use(express.json());

const port = 3000;

app.listen(port, (req, res) => {
  console.log("Server Is Running On Port: " + port);
});

