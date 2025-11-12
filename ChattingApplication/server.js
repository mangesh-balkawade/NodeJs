// server.js

const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 3000;
const bodyParser = require("body-parser");
const message = require("./models/messges");

app.use(bodyParser.json());

// Serve the static files
app.use(express.static(__dirname));

// Socket.IO connection handling
io.on("connection", (socket) => {

  // Handle new messages sent by employees
  socket.on("sendMessageEmployee", async (data) => {
    await message.create({
      empId: data.empId,
      custId: data.custId,
      content: data.message,
      sender: "emp",
    });

    // Broadcast the new message to the customer
    socket.broadcast.emit("newMessage", data);
  });

  // Handle new messages sent by customers
  socket.on("sendMessageCustomer", async (data) => {
    await message.create({
      empId: data.empId,
      custId: data.custId,
      content: data.message,
      sender: "cust",
    });

    // Broadcast the new message to the employee
    socket.broadcast.emit("newMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
  
});

app.get("/allMessage/employee/:empId/:custId", async (req, res) => {
  let exist_conversion = await message.findAll({
    where: {
      empId: req.params.empId,
      custId: req.params.custId,
    },
    order: [["timestamp", "ASC"]],
  });

  if (exist_conversion) {
    res.send(exist_conversion);
  } else {
    res.send("Conversion does not exist");
  }
});

app.get("/allMessage/customer/:empId/:custId", async (req, res) => {
  let exist_conversion = await message.findAll({
    where: {
      empId: req.params.empId,
      custId: req.params.custId,
    },
    order: [["timestamp", "ASC"]],
  });

  if (exist_conversion) {
    res.send(exist_conversion);
  } else {
    res.send("Conversion does not exist");
  }
});

http.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
