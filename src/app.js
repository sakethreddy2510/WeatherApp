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
  getWeatherData(req.query.address, (error, data) => {
    if (error) {
      return res.send(error);
    }
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
