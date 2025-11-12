const Vendor = require("./Models/Vendors");
const Product = require('./Models/Products');
const ProductVendor = require("./Models/ProductVendor");

console.log("Relationships");

// Define the many-to-many relationship
Product.belongsToMany(Vendor, { through: ProductVendor, as: 'vendors' });
Vendor.belongsToMany(Product, { through: ProductVendor, as: 'products' });

Product.sync({ alter: false });
Vendor.sync({ alter: false });
ProductVendor.sync({});