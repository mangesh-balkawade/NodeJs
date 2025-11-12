const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV;

const config = {
    development: {
        host: process.env.DB_HOST_DEV,
        port: process.env.DB_PORT_DEV,
        database: process.env.DB_NAME_DEV,
        username: process.env.DB_USER_DEV,
        password: process.env.DB_PASSWORD_DEV,
        dialect: "mysql",
    },
    production: {
        host: process.env.DB_HOST_PROD,
        port: process.env.DB_PORT_PROD,
        database: process.env.DB_NAME_PROD,
        username: process.env.DB_USER_PROD,
        password: process.env.DB_PASSWORD_PROD,
        dialect: "mysql",
    },
    local: {
        host: process.env.DB_HOST_LOCAL,
        port: process.env.DB_PORT_LOCAL,
        database: process.env.DB_NAME_LOCAL,
        username: process.env.DB_USER_LOCAL,
        password: process.env.DB_PASSWORD_LOCAL,
        dialect: "mysql",
    },
};

const sequelize = new Sequelize(config[env]);

try {
    sequelize.authenticate();
    console.log("Connection Has Been Established Successfully.");
} catch (error) {
    console.error("Unable To Connect To The Database:", error);
}

module.exports = sequelize;
