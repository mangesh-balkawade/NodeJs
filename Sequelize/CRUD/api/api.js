const express = require("express");
const user = require("../models/user");

const app = express();

app.get("/findAllUser", async (req, resp) => {
  try {
    let user_all = await user.findAll();
    resp.status(200).json(user_all);
  } catch (err) {
    resp.status(500).json({
      message: "unable to find details",
    });
  }
});

app.post("/addUser", (req, resp) => {
  try {
    if (req.body == undefined)
      return resp.json({
        message: "Please Provide The User Details",
      });
    let new_user = req.body;
    user.create(new_user);
    resp.send("User Created");
  } catch (err) {
    resp.json({
      message: "Unable to cerate a user",
    });
  }
});

app.put("/updateUser/:id", async (req, res) => {
  try {
    if (req.body == undefined)
      return resp.json({
        message: "Please Provide The User Details",
      });
    await user.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send("User Updated");
  } catch (err) {
    res.json({
      message: "Unable to update a user " + err,
    });
  }
});

app.delete("/deleteUser/:id", async (req, res) => {
  try {
    user.destroy({
      where: { id: req.params.id },
    });
    res.send("user deleted");
  } catch (err) {
    res.send(err);
  }
});

module.exports = app;
