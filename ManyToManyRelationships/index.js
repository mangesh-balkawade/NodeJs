const express = require('express');
const app = express();

app.use(express.json());

require("./relationship");

const ProductRoutes = require("./Routes/ProductRoutes");
const VendorRoutes = require('./Routes/VendorRoutes');

app.use(ProductRoutes);
app.use(VendorRoutes);

app.listen(3000, () => {
    console.log("Server Is Runnin On Port 3000");
})