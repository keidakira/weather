import React, { useEffect, useState } from "react";
import "../App.css";
import { Card, CardContent, Switch } from "@mui/material";

const WeatherCard = ({ data, units, onUnitChange }) => {
  const weather = data.weather[0];
  const weatherImage = `http://openweathermap.org/img/wn/${weather.icon}@4x.png`;
  const temperature = data.main;

  const [currentTemp, setCurrentTemp] = useState(0);

  const convertToCelcius = (temp) => {
    return Math.round((temp - 32) * (5 / 9));
  };

  useEffect(() => {
    if (units === "F") {
      setCurrentTemp(Math.round(temperature.temp));
    } else {
      setCurrentTemp(convertToCelcius(temperature.temp));
    }
  }, [temperature.temp, units]);

  return (
    <div className="flex container justify-center w-100">
      <div className="card-container">
        <Card>
          <CardContent>
            <div className="flex container justify-between">
              <div className="weather-image flex align-center">
                <img src={weatherImage} alt={weather.main} />
                <div>
                  <p>{weather.main}</p>
                  <small>{weather.description}</small>
                </div>
              </div>
              <div className="weather-temp flex align-center">
                <p className="temperature">
                  {currentTemp}&deg; {units}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-center align-center">
          Celcius{" "}
          <Switch
            name="metric"
            checked={units === "F"}
            onChange={() => onUnitChange(units)}
          />{" "}
          Fahrenheit
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
