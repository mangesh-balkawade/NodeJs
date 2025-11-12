const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    {
        database: "mangesh",
        host: "localhost",
        username: "root",
        password: "",
        dialect: "mysql",
    }
);

sequelize.authenticate(() => {
    console.log("db connected");
});

module.exports = {
    sequelize
}