const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();
const getWeatherData = require("../utils/weatherData");

const publicpath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");

app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicpath));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
  });
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
app.get("*", (req, res) => {
  res.send("404 Not Found");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
