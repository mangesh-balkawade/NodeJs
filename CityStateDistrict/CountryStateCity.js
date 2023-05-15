const { DataTypes } = require("sequelize");
const sequelize = require("./database_config");

const CSC = sequelize.define(
  "CountryStateCity",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    createdAt: true,
    updatedAt: true,
    timestamps: true,
  }
);

CSC.saveCountryStateCity = async function (obj) {
  await this.create({
    country: obj.country,
    state: obj.state,
    city: obj.city,
  });
};

CSC.getCountries = async function () {
  try {
    const countries = await CSC.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("country")), "country"],
      ],
    });
    console.log(countries.length);
    return await countries.map((country) => country.country);
  } catch (err) {
    console.error("Error retrieving countries:", err);
    return err;
  }
};

CSC.getStateByCountryName = async function (country_name) {
  try {
    const states = await CSC.findAll({
      attributes: [[sequelize.fn("DISTINCT", sequelize.col("state")), "state"]],
      where: {
        country: country_name,
      },
    });
    console.log(states.length);
    return await states.map((state) => state.state);
  } catch (err) {
    console.error("Error retrieving countries:", err);
    return err;
  }
};

CSC.getCityByCountryNameStateName = async function (country_name, state_name) {
  try {
    const cities = await CSC.findAll({
      attributes: [[sequelize.fn("DISTINCT", sequelize.col("city")), "city"]],

      where: {
        country: country_name,
        state: state_name,
      },
    });
    console.log(cities.length);
    return await cities.map((city) => city.city);
  } catch (err) {
    console.error("Error retrieving countries:", err);
    return err;
  }
};

sequelize.sync({ alter: true });

module.exports = CSC;
