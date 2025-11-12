const CustomerModel = require('../Models/CustomerModel');
const Messages = require("../Helpers/Messages");
const logServices = require("./LogServices");
const Dbmodel = CustomerModel;
const PrimaryKey = "customerId"


const CustomerServices = {

    async saveData(data) {
        try {
            let savedData = await Dbmodel.create(data);
            return savedData;
        }
        catch (error) {
            await logServices.saveLog(error);
            if (error?.parent?.errno == '1452') {
                throw error;
            }
            throw new Error(Messages.UnableToSaveData);
        }
    },

    async getAllData(order = "ASC") {
        try {
            let data = await Dbmodel.findAll({
                where: {
                    deleteFlag: 0
                },
                order: [[PrimaryKey, order]]
            });
            return data;
        }
        catch (error) {
            await logServices.saveLog(error);
            throw new Error(Messages.UnableToGetData);
        }
    },

    async getFilterData(filter, order = "ASC") {
        try {
            let data = await Dbmodel.findAll({
                where: {
                    deleteFlag: 0,
                    ...filter
                },
                order: [[PrimaryKey, order]]
            });
            return data;
        }
        catch (error) {
            await logServices.saveLog(error);
            throw new Error(Messages.UnableToGetEntity);
        }
    },

    async getFilterDataWithAttributes(filter, attributes, order = "ASC") {
        try {
            let data = await Dbmodel.findAll({
                attributes,
                where: {
                    deleteFlag: 0,
                    ...filter
                },
                order: [[PrimaryKey, order]]
            });
            return data;
        }
        catch (error) {
            await logServices.saveLog(error);
            throw new Error(Messages.UnableToGetData);
        }
    },

    async getAllWithPaginationFilter(filter, page, pageSize, orderBy = PrimaryKey, orderDir = 'ASC') {
        try {
            const offset = (page - 1) * pageSize;

            // Fetch items and there counts for the current page with pagination
            const rows = await Dbmodel.findAll({
                where: filter,
                include: [
                ],
                offset,
                limit: pageSize,
                order: [[orderBy, orderDir]]
            });

            return rows;
        } catch (error) {
            await logServices.saveLog(error);
            throw new Error(Messages.UnableToGetData);
        }
    },

    async getDataById(id) {
        try {
            let data = await Dbmodel.findOne({
                where: {
                    [PrimaryKey]: id,
                    deleteFlag: 0
                }
            });

            return data;
        } catch (error) {
            await logServices.saveLog(error);
            throw new Error(Messages.UnableToGetDataById);
        }
    },

    async getDataByIdWithoutInclude(id) {
        try {
            let data = await Dbmodel.findOne({
                where: {
                    [PrimaryKey]: id,
                    deleteFlag: 0
                }
            });

            return data;

        } catch (error) {
            await logServices.saveLog(error);
            throw new Error(Messages.UnableToGetDataById);
        }
    },


    async updateData(id, updatedData) {
        try {
            let data = await Dbmodel.findOne({
                where: {
                    [PrimaryKey]: id
                }
            });

            if (!data) {
                throw new Error(Messages.UnableToGetDataById);
            }

            Object.assign(data, updatedData);

            await data.save();

            return data;
        } catch (error) {
            await logServices.saveLog(error);
            if (error?.parent?.errno == '1452') {
                throw error;
            }
            throw new Error(Messages.UnableToUpdateData);
        }
    },

    async deleteData(id) {
        try {
            let data = await Dbmodel.findOne({
                where: {
                    deleteFlag: 0,
                    [PrimaryKey]: id
                }
            });

            if (!data) {
                throw new Error(Messages.UnableToGetDataById);
            }

            data.deleteFlag = 1;
            await data.save();
            return true;
        }
        catch (error) {
            await logServices.saveLog(error);
            throw new Error(Messages.UnableToDeleteData);
        }
    },
    async existData(filter) {
        try {
            let count = await Dbmodel.count({
                where: {
                    deleteFlag: 0,
                    ...filter
                }
            });
            if (count > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            await logServices.saveLog(error);
            throw new Error(Messages.UnableToGetData);
        }
    },

    async getTotalCount(filter) {
        try {
            let count = await Dbmodel.count({
                where: filter
            });
            return count;
        }
        catch (error) {
            await logServices.saveLog(error);
            throw new Error(Messages.UnableToGetData);
        }
    },

};

module.exports = CustomerServices;
