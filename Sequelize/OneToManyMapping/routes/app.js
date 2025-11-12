const express = require("express");
const Employee = require("../models/Employee");
const Laptop = require("../models/Laptop");

const app = express();

app.post("/addEmp", async (req, res) => {
  let emp = await Employee.create({
    name: req.body.name,
  });
  res.send("emp added");
});

app.post("/addLaptop", async (req, res) => {
  let laptop = req.body.laptop;
  let empid = req.body.empid;
  for (let index = 0; index < laptop.length; index++) {
    let lname = laptop[index].lname;
    await Laptop.create({
      lname,
      eid: empid,
    });
  }
  res.send("lap added");
});

app.get("/allInfo", async (req, res) => {
  let info = await Laptop.findAll({
    where: {
      eid: 1,
    },
  });
  res.send(info)
});
module.exports = app;
