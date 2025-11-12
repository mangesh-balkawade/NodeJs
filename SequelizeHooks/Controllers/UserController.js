const UserService = require("../Services/UserServices");


exports.saveUser = async (req, res, next) => {
    try {
        let data = req.body;
        let savedData = await UserService.saveData(data);
        return res.status(201).json({
            message: "Data Saved",
            savedData
        });
    } catch (err) {
        next(err);
    }
}