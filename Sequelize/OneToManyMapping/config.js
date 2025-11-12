const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mapping", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then((result) => {
    console.log("DataBase Connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = sequelize;
