const express = require("express");

const country = require("country-state-city").Country;
const state = require("country-state-city").State;
const city = require("country-state-city").City;

const location = require("./CountryStateCity");

const app = express();

//////////////////////////////////////////////////////
// Api to Add Country State and Cities in Database
// Use this Only One's for storing the data
///////////////////////////////////////////////////////

app.post("/saveAllCountriesStatesCities", async (req, res) => {
  try {
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
      let obj = {
        country: country_state_city[i].country_1,
        state: country_state_city[i].state_1,
        city: country_state_city[i].city_1,
      };

      await location.saveCountryStateCity(obj);

      console.log(country_state_city[i]);
    }
    res.send("Data Added To DataBase ");
  } catch (err) {
    res.status(500).send("Unable to Add Data In Table");
  }
});

app.get("/getCountries", async (req, res) => {
  try {
    let countries = await location.getCountries();
    res.send(countries);
  } catch (err) {
    res.send("unable to send country ");
  }
});

app.get("/getStates/:countryName", async (req, res) => {
  try {
    let states = await location.getStateByCountryName(req.params.countryName);
    res.send(states);
  } catch (err) {
    res.send("unable to send sattes" + err);
  }
});

app.get("/getCities/:countryName/:cityName", async (req, res) => {
  try {
    let cities = await location.getCityByCountryNameStateName(
      req.params.countryName,
      req.params.cityName
    );
    res.send(cities);
  } catch (err) {
    res.send("Unable to get cities");
  }
});

module.exports = app;
