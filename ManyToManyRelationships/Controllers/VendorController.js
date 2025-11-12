const VendorServices = require("../Services/VendorServices");
const Services = VendorServices;

exports.saveData = async (req, res) => {
    try {

        let data = req.body;
        let savedData = await Services.saveData(data);

        return res.status(201).json({
            savedData,
            message: 'Data Saved'
        });

    }

    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Unable To Save Data",
            error
        })
    }
}
