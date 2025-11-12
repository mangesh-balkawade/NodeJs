const AdminServices = require("../Services/AdminServices");
const Common = require("../Utils/Common");
const ApiResponse = require("../Helpers/ApiResponse");
const Service = AdminServices;
const PrimaryKey = "adminId";

exports.saveData = async (req, res) => {
    try {
        let data = req.body;

        let dataExist = await Service.getSingleDataWithFilter({ email: data.email });
        if (dataExist) {
            return ApiResponse.dataAlreadyExists(res);
        }

        let encryptedPassword = await Common.encryptPassword(data.password);

        delete data.password;
        data.password = encryptedPassword;

        let savedData = await Service.saveData(data);
        return ApiResponse.saveResponse(res, { savedData });
    }
    catch (error) {
        return await Common.handleServerError(res, error);
    }
}

exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;

        let dataExist = await Service.getSingleDataWithFilter({ email });
        if (!dataExist) {
            return ApiResponse.dataNotAvailable(res, "Admin Does Not Exists");
        }

        let passwordMatched = await Common.comparePasswords(password, dataExist.password);
        console.log(passwordMatched, password, dataExist.password);
        if (!passwordMatched) {
            return ApiResponse.invalidCredentialResponse(res);
        }

        let payload = {
            id: dataExist.adminId,
            name: dataExist.name,
            email: dataExist.email
        }

        let token = await Common.generateToken(payload);
        return ApiResponse.sendDataResponse(res, { token }, "Login Successfull.");
    }
    catch (error) {
        return await Common.handleServerError(res, error);
    }
}

exports.updateData = async (req, res) => {
    try {
        let { id } = req.login;
        let data = req.body;
        delete data.password;

        let dataExist = await Service.existData({ [PrimaryKey]: id });
        if (!dataExist) {
            return ApiResponse.dataNotAvailable(res);
        }

        let updatedData = await Service.updateData(id, data);
        return ApiResponse.updateResponse(res, { updatedData });
    }
    catch (error) {
        return await Common.handleServerError(res, error);
    }
}

exports.deleteData = async (req, res) => {
    try {
        let { id } = req.params;

        let dataExist = await Service.existData({ [PrimaryKey]: id });
        if (!dataExist) {
            return ApiResponse.dataNotAvailable(res);
        }

        let flag = await Service.deleteData(id);
        if (flag) {
            return ApiResponse.deleteResponse(res);
        }
        else {
            return ApiResponse.serverIssueResponse(res);
        }
    }
    catch (error) {
        return await Common.handleServerError(res, error);
    }
}

exports.getData = async (req, res) => {
    try {
        let data = await Service.getAllData();
        return ApiResponse.sendDataResponse(res, { data });
    }
    catch (error) {
        return await Common.handleServerError(res, error);
    }
}