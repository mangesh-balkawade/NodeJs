const express = require("express");
const country = require("country-state-city").Country;
const state = require("country-state-city").State;
const city = require("country-state-city").City;
const mysql = require("mysql");
const routes = require("./CountryStateCityRoutes");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "country_states_city",
// });

// // connect to the MySQL database
// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("Connected to database");
// });

// // create a table if it does not exist
// const createTable = `CREATE TABLE IF NOT EXISTS locations (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     country VARCHAR(255),
//     state VARCHAR(255),
//     city VARCHAR(255)
//   )`;

// db.query(createTable, (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("Table created or already exists");
// });

const app = express();
app.use(routes);

app.get("/getAllData", async (req, res) => {
  let countryCode = [];
  let countryobj = country.getAllCountries();

  for (let i = 0; i < countryobj.length; i++) {
    countryCode.push(countryobj[i].isoCode);
  }

  countries = [];
  let statesCode = [];
  let cities = [];
  states = state.getStatesOfCountry("IN");
  country_state_city = [];

  for (
    let country_code = 0;
    country_code < countryCode.length;
    country_code++
  ) {
    let country_name = country.getCountryByCode(countryCode[country_code]);
    statesCode = state.getStatesOfCountry(countryCode[country_code]);

    for (let state_code = 0; state_code < statesCode.length; state_code++) {
      cities = city.getCitiesOfState(
        countryCode[country_code],
        statesCode[state_code].isoCode
      );

      for (let i = 0; i < cities.length; i++) {
        state_1 = await state.getStateByCodeAndCountry(
          statesCode[state_code].isoCode,
          countryCode[country_code]
        ).name;
        state_1 = state_1.replace(/[^A-Za-z0-9]/g, "");
        city_1 = cities[i].name;
        city_1 = city_1.replace(/[^A-Za-z0-9]/g, "");
        country_1 = country_name.name;
        country_1 = country_1.replace(/[^A-Za-z0-9]/g, "");
        country_state_city.push({ country_1, state_1, city_1 });
      }
    }
    console.log(country_name.name);
  }
  for (let i = 0; i < country_state_city.length; i++) {
    let addLocation = `INSERT INTO locations (country, state, city) VALUES ('${country_state_city[i].country_1}', '${country_state_city[i].state_1}', '${country_state_city[i].city_1}')`;

    await db.query(addLocation, (err) => {
      if (err) {
        throw err;
      }
      console.log("Locations added");
    });
    console.log(country_state_city[i]);
  }
  res.send("Data Added To DataBase ");
});

app.get("/getAllData", (req, res) => {});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
