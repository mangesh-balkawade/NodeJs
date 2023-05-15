express = require("express");
mongoose = require("mongoose");
router = require("./api/api.js");
filerouter=require('./api/fileupload.js')

const cors = require("cors");
const bodyParser = require("body-parser");


app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(router);
app.use(filerouter)
app.use(express.json());

const port = 3000;

app.listen(port, (req, res) => {
  console.log("Server Is Running On Port: " + port);
});

const database =
  "mongodb+srv://marvellous:marvellous@marvellous.ihqyjz4.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(database)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log("Unable to Connect to the Database" + err);
  });
