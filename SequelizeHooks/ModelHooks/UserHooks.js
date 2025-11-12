const User = require("../Models/UserModel");

// After Save
User.afterCreate((user, options) => {
    console.log(user.dataValues);
});