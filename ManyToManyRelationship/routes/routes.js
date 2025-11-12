const express = require("express");
const route = express.Router();
const User = require("../models/user");
const Role = require("../models/roles");

// User model, Sequelize generates methods like addRoles, setRoles, getRoles, etc. Similarly, 
// for the Role model, Sequelize generates methods like addUsers, setUsers, getUsers, etc.



route.get(
    "/getUsers",
    async (req, res) => {
        try {
            let users = await User.findAll({
                include: [
                    {
                        model: Role
                    }
                ]
            });
            return res.status(200).json({ users });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Unable To Get Data" });
        }
    }
);


route.get(
    "/getRoles",
    async (req, res) => {
        try {
            let roles = await Role.findAll({
                include: [
                    {
                        model: User
                    }
                ]
            });
            return res.status(200).json({ roles });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Unable To Get Data" });
        }
    }
);

route.post(
    "/saveUser",
    async (req, res) => {
        try {
            let userData = req.body;
            let savedData = await User.create(userData);
            return res.status(201).json({ savedData });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Unable To Get Data" });
        }
    }
);

route.post(
    "/saveRole",
    async (req, res) => {
        try {
            let roleData = req.body;
            let savedData = await Role.create(roleData);
            return res.status(201).json({ savedData });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Unable To Get Data" });
        }
    }
);

route.patch(
    "/updateUserRole",
    async (req, res) => {
        try {
            let data = req.body;
            let user = await User.findOne({ where: { userId: data.userId } });
            if (user) {
                if (data.roles && data.roles.length > 0) {
                    let roles = await Role.findAll({ where: { roleId: data.roles } });
                    //                         Automatically Generated
                    let savedData = await user.addRoles(roles);
                    return res.status(200).json({ savedData });
                }
            }
            return res.status(200).json({});
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Unable To Get Data" });
        }
    }
);

route.patch(
    "/updateRoleUser",
    async (req, res) => {
        try {
            let data = req.body;
            let role = await Role.findOne({ where: { roleId: data.roleId } });
            if (role) {
                if (data.userIds && data.userIds.length > 0) {
                    let userIds = await User.findAll({ where: { userId: data.userIds } });
                    //                         Automatically Generated
                    let savedData = await role.addUsers(userIds);
                    return res.status(200).json({ savedData });
                }
            }
            return res.status(200).json({});
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Unable To Get Data" });
        }
    }
);


module.exports = route;