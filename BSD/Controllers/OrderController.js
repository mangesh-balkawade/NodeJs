const OrderServices = require("../Services/OrderServices");
const OrderLineItemServices = require("../Services/OrderLineItemServices");
const Common = require("../Utils/Common");
const ApiResponse = require("../Helpers/ApiResponse");
const Service = OrderServices;
const PrimaryKey = "orderId";
const sequelize = require("../Config/SequelizeConfig");
const Messages = require("../Helpers/Messages");

exports.saveData = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        let data = req.body;
        data.createdById = req.login.id;

        let orderLineItems = req.body.orderLineItems;

        if (typeof orderLineItems == 'string') {
            orderLineItems = JSON.parse(orderLineItems);
        }

        if (orderLineItems.length == 0) {
            await transaction.rollback();
            return ApiResponse.badRequestResponse(res, "Please Provide The Order Items");
        }

        let savedData = await Service.saveDataWithTransaction(data, transaction);
        if (!savedData) {
            await transaction.rollback();
            throw new Error(Messages.UnableToSaveData);
        }

        let totalAmount = 0;
        let discount = 0;

        for (let item of orderLineItems) {
            item[PrimaryKey] = savedData[PrimaryKey];
            item.createdById = req.login.id;

            let price = item.rate * item.quantity;
            item.price = price;

            let itemDiscount = item.standerdRate * item.quantity;
            discount += itemDiscount;

            let savedItemData = await OrderLineItemServices.saveDataWithTransaction(item, transaction);
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

        let updatedData = await OrderServices.updateData(savedData[PrimaryKey], { totalAmount, grossAmount, discount });
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

exports.updateOrderLineItems = async (req, res) => {
    try {
        let { id } = req.params;
        let data = req.body;

        let dataExist = await OrderLineItemServices.existData({ orderLineItemId: id });
        if (!dataExist) {
            return ApiResponse.dataNotAvailable(res);
        }

        let updatedData = await OrderLineItemServices.updateData(id, data);
        return ApiResponse.updateResponse(res, { updatedData });
    }
    catch (error) {
        return await Common.handleServerError(res, error);
    }
}