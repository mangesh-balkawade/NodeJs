const express = require("express");
const connection = require("../config.js");
const app = express();

app.get("/getAllEmployees", (req, res) => {
  connection.query("select * from employee", (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      res.send(err.message);
    }
  });
});

app.post("/addEmployee", (req, res) => {
  const employee = req.body;

  connection.query(
    "insert into employee values (?,?,?)",
    [employee.id, employee.name, employee.age],
    (err, result) => {
      if (!err) {
        res.send("Employee Added to the Database");
      } else {
        res.send("Unable to add employee : " + err.message);
      }
    }
  );
});

app.put("/updateEmployee/:id", async (req, res) => {
  let id = req.params.id;
  let emp = null;
  await connection.query(
    "select * from employee where id=?",
    id,
    (err, result) => {
      if (!err) {
        if (result == undefined) {
          res.send("Please Provide Proper Id Unable to Fetch Employee");
        }
        emp = result;
        if (req.body.name) emp.name = req.body.name;
        if (req.body.age) emp.age = req.body.age;
        connection.query(
          "update employee set age=?,name=? where id=?",
          [emp.age, emp.name, id],
          (err, result) => {
            if (!err) {
              res.send("Employee With Upadation ");
            } else {
              res.send("Unable to Update Employee");
            }
          }
        );
      } else {
        res.send("Unable to Update Employee");
      }
    }
  );
});

app.delete("/deleteEmployee/:id", async (req, res) => {
  let id = req.params.id;
  await connection.query(
    "delete from employee where id =?",
    id,
    (err, result) => {
      if (!err) {
        res.send("Employee with the id :" + id + " is Deleted");
      } else {
        res.send("Unable to Delete EMployee");
      }
    }
  );
});

module.exports = app;
