const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost", // server name
  user: "root", // username
  password: "root", // password
  database: "nodejs",
});

connection.connect((err) => {
  if (err) {
    console.log("Unale to connect to database" + err.message);
  } else {
    console.log("Connected to Database");
  }
});

module.exports=connection