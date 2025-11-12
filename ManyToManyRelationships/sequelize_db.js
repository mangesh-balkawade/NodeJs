const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    host: "localhost",
    port: 3306,
    dialect: 'mysql',
    username: 'root',
    // password: ' ',
    database: 'mapping_manytomany'
});

try {
    sequelize.authenticate();
}
catch (error) {
    console.log(error);
}

module.exports = sequelize;