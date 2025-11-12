const mysql = require("mysql");

const connection = mysql.createConnection(
    {
        user: "root",
        password: "",
        host: "localhost",
        database: "mangesh"
    }
);

module.exports = connection;
