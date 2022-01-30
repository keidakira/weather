// Create an api object using axios

import axios from "axios";

class WeatherManager {
  API_KEY = "e35206f5b55c6a87e09e64312b3247ce";
  baseUrl = "https://api.openweathermap.org/data/2.5/";

  api = axios.create({
    baseURL: this.baseUrl,
    params: {
      appid: this.API_KEY,
      units: "imperial",
    },
  });
}

export default WeatherManager;
