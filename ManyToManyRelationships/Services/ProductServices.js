const ProductModel = require("../Models/Products");
const Vendor = require("../Models/Vendors");
const { Op } = require('sequelize')

const dbModel = ProductModel;

const Service = {
    async saveData(data) {
        try {
            let savedData = await dbModel.create(data);
            return savedData;
        }
        catch (error) {
            console.log(error);
            throw new Error("Unable To Save Data");
        }
    },

    async getData() {
        try {
            let data = await dbModel.findAll(
                {
                    include: [
                        {
                            model: Vendor,
                            as: "vendors",
                            where: {
                                rating: {
                                    [Op.gte]: 4
                                }
                            }
                        }
                    ]
                }
            );
            return data;
        }
        catch (error) {
            console.log(error);
            throw new Error("Unable To Get Data");
        }
    }
}

module.exports = Service;