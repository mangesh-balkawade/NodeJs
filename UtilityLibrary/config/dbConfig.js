const { Sequelize } = require("sequelize");

let connectionObj = {
    database: process.env.database,
    username: "root",
    password: process.env.password,
    host: process.env.host,
    dialect: process.env.dialect,
    port: process.env.port,
}

const sequelize = new Sequelize(connectionObj);

try {
    sequelize.authenticate().then((data) => { console.log("Sequelize connect"); })
}
catch (error) {
    console.log(error);
}

module.exports = sequelize;