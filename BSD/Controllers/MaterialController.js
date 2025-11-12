const MaterialServices = require("../Services/MaterialServices");
const Common = require("../Utils/Common");
const ApiResponse = require("../Helpers/ApiResponse");
const Service = MaterialServices;
const PrimaryKey = "materialId";

exports.saveData = async (req, res) => {
    try {
        let data = req.body;
        let savedData = await Service.saveData(data);
        return ApiResponse.saveResponse(res, { savedData });
    }
    catch (error) {
        return await Common.handleServerError(res, error);
    }
}

exports.updateData = async (req, res) => {
    try {
        let { id } = req.params;
        let data = req.body;

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