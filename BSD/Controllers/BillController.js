const BillServices = require("../Services/BillServices");
const BillLineItemServices = require("../Services/BillLineItemServices");
const Common = require("../Utils/Common");
const ApiResponse = require("../Helpers/ApiResponse");
const Service = BillServices;
const PrimaryKey = "billId";
const sequelize = require("../Config/SequelizeConfig");
const Messages = require("../Helpers/Messages");

exports.saveData = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        let data = req.body;
        data.createdById = req.login.id;

        let billLineItems = req.body.billLineItems;

        if (typeof billLineItems == 'string') {
            billLineItems = JSON.parse(billLineItems);
        }

        if (billLineItems.length == 0) {
            await transaction.rollback();
            return ApiResponse.badRequestResponse(res, "Please Provide The Bill Items");
        }

        let savedData = await Service.saveDataWithTransaction(data, transaction);
        if (!savedData) {
            await transaction.rollback();
            throw new Error(Messages.UnableToSaveData);
        }

        let totalAmount = 0;
        let discount = 0;

        for (let item of billLineItems) {
            item[PrimaryKey] = savedData[PrimaryKey];
            item.createdById = req.login.id;

            let price = item.rate * item.quantity;
            item.price = price;

            let itemDiscount = item.standerdRate * item.quantity;
            discount += itemDiscount;

            let savedItemData = await BillLineItemServices.saveDataWithTransaction(item, transaction);
            if (!savedItemData) {
                await transaction.rollback();
                throw new Error(Messages.UnableToSaveData);
            }
            totalAmount += savedItemData.price;
        }

        await transaction.commit();

        let tax = data.cgst + data.sgst;
        let grossAmount = totalAmount + ((totalAmount / 100) * tax);
        discount -= totalAmount;

        let updatedData = await Service.updateData(savedData[PrimaryKey], { totalAmount, grossAmount, discount });
        console.log(updatedData);

        return ApiResponse.saveResponse(res, { savedData });
    }
    catch (error) {
        await transaction.rollback();
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

exports.updateBillLineItems = async (req, res) => {
    try {
        let { id } = req.params;
        let data = req.body;

        let dataExist = await BillLineItemServices.existData({ billLineItemId: id });
        if (!dataExist) {
            return ApiResponse.dataNotAvailable(res);
        }

        let updatedData = await BillLineItemServices.updateData(id, data);
        return ApiResponse.updateResponse(res, { updatedData });
    }
    catch (error) {
        return await Common.handleServerError(res, error);
    }
}