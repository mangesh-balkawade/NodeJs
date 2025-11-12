const ProductService = require("../Services/ProductServices");
const Services = ProductService;

exports.saveData = async (req, res) => {
    try {

        let data = req.body;
        let saveProductData = await Services.saveData(data);
        if (data.vendors) {
            await saveProductData.setVendors(data.vendors);
        }

        return res.status(201).json({
            saveProductData,
            message: 'Data Saved'
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Unable To Save Data",
            error
        })
    }
}

exports.getProducts = async (req, res) => {
    try {

        let data = await Services.getData();

        return res.status(200).json({
            data,
            message: 'Data Get'
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Unable To Get Data",
            error
        })
    }
}