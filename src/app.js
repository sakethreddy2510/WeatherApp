const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();
const getWeatherData = require("../utils/weatherData");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("Please provide an address");
  }
  // Usage with async/await
  async function getWeather() {
    try {
      const weatherData = await getWeatherData(req.query.address);
      res.send(weatherData);
    } catch (error) {
      res.send(error);
    }
  }
  getWeather();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
