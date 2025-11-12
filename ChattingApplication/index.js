const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const message = require("./models/messges");

app.use(bodyParser.json());

app.get("/employee/getAllChats",(req,res)=>{
try
{

}
catch(err){
  
}
})

app.get("/employee/getAllMessages/:empId/:custId", async (req, res) => {
  try {
    let exist_conversion = await message.findAll({
      where: {
        empId: req.params.empId,
        custId: req.params.custId,
      },
      order: [["timestamp", "ASC"]],
    });

    if (exist_conversion) {
      res.status(200).json({
        messages: exist_conversion,
        statuscode: 200,
      });
    } else {
      res.status(404).json({
        messages: [],
        statuscode: 404,
      });
    }
  } catch (err) {
    res.status(500).json({
      statuscode: 500,
      error: "Unable to Get Conversion",
    });
  }
});

app.post("/employee/sendMessage", async (req, res) => {
  try {
    await message.create({
      empId: req.body.empId,
      custId: req.body.custId,
      content: req.body.message,
      sender: "emp",
    });
    res.status(200).json({
      message: "Message Has Been Send",
      statuscode: 200,
    });
  } catch (err) {
    res.status(500).json({
      error: "Unable To Send Message",
      statuscode: 500,
    });
  }
});

app.get("/customer/getAllMessages/:empId/:custId", async (req, res) => {
  try {
    let exist_conversion = await message.findAll({
      where: {
        empId: req.params.empId,
        custId: req.params.custId,
      },
      order: [["timestamp", "ASC"]],
    });

    if (exist_conversion) {
      res.status(200).json({
        messages: exist_conversion,
        statuscode: 200,
      });
    } else {
      res.status(404).json({
        messages: [],
        statuscode: 404,
      });
    }
  } catch (err) {
    res.status(500).json({
      statuscode: 500,
      error: "Unable to Get Conversion",
    });
  }
});

app.post("/customer/sendMessage", async (req, res) => {
  try {
    await message.create({
      empId: req.body.empId,
      custId: req.body.custId,
      content: req.body.message,
      sender: "emp",
    });
    res.status(200).json({
      message: "Message Has Been Send",
      statuscode: 200,
    });
  } catch (err) {
    res.status(500).json({
      error: "Unable To Send Message",
      statuscode: 500,
    });
  }
});

app.listen(port, (req, res) =>
  console.log(`Example app listening on port ${port}!`)
);
