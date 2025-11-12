const VendorModel = require("../Models/Vendors");

const dbModel = VendorModel;

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
    }
}

module.exports = Service;