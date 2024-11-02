const request = require("request");
const util = require("util");

// Convert request to use promises instead of callbacks
const promisifiedRequest = util.promisify(request);

const openWeatherMapURL = {
  BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
  SECRET_KEY: "49c18b8191205021debbbae81d2e3555",
};

const getWeatherData = async (address) => {
  try {
    const url = `${openWeatherMapURL.BASE_URL}${encodeURIComponent(
      address
    )}&APPID=${openWeatherMapURL.SECRET_KEY}`;
    const { body } = await promisifiedRequest({ url, json: true });
    return body;
  } catch (error) {
    throw new Error(`Unable to connect to weather service: ${error.message}`);
  }
};

module.exports = getWeatherData;
