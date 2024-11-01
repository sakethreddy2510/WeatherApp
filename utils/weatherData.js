const request = require("request");

const openWeatherMapURL = {
  BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
  SECRET_KEY: "49c18b8191205021debbbae81d2e3555",
};

const getWeatherData = (address, callback) => {
  const url =
    openWeatherMapURL.BASE_URL +
    encodeURIComponent(address) +
    "&APPID=" +
    openWeatherMapURL.SECRET_KEY;
  request({ url, json: true }, (error, data) => {
    if (error) {
      callback(true, "Unable to connect to weather service!" + error);
    } else {
      callback(false, data.body);
    }
  });
};

module.exports = getWeatherData;
