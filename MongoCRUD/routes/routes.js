const express = require("express");
emp = require("../models/employee.js");
const app = express();

app.get("/get", (req, resp) => {
  resp.status(200).send("Get Request");
});

app.get("/getAll", async (req, res) => {
  try {
    const arrEmp = await emp.find({});
    res.send(arrEmp);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/addEmp",async(req, res) => {
    try
    {
      console.log(req.body);
      const newEmp= new emp(req.body)
      await newEmp.save()
      res.send(req.body+"hi")
    }
    catch(err)
    {
        res.status(500).send("UNable to Add Employees")
    }
});

module.exports = app;
