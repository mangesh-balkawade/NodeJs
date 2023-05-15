const express = require("express");
const emp = require("../modules/emp");
const middlewares = require("../middleware");

const app = express();

//app.use(middlewares) // app level middleware

// app.use('/api',middlewares) // je start hoyil api ne tyachyavar apply honar

app.get("/chk", (req, res) => {
  res.status(200).json({
    msg: "APi is working",
  });
});

// routes level
app.post("/addEmp", middlewares, async (req, res) => {
  try {
    console.log(req.body);
    const newEmployee = new emp(req.body);
    newEmployee.save();
    res.status(200).json({
      message: `Employee is save with the id as ${newEmployee.id}`,
    });
  } catch (err) {
    res.status(500).json({
      message: "Unable to Add Employee",
    });
  }
});

app.get("/getAllEmp", async (req, res) => {
  try {
    let users = await emp.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      error: ` Error rise due to ${err.message}`,
    });
  }
});



module.exports = app;
