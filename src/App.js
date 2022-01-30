import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import WeatherManager from "./api";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  const [query, setQuery] = React.useState("");
  const [data, setData] = React.useState(null);
  const [units, setUnits] = React.useState("F");

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const getCityWeather = async () => {
    setData(null);

    const weatherManager = new WeatherManager();
    const weatherAPI = weatherManager.api;

    const response = await weatherAPI.get(`weather?q=${query}`);
    setData(response.data);
  };

  const changeUnit = (metric) => {
    if (metric === "C") {
      setUnits("F");
    } else {
      setUnits("C");
    }
  };

  return (
    <div>
      <div className="flex-inline container justify-center w-100">
        <TextField
          placeholder="City"
          value={query}
          onChange={handleQueryChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={getCityWeather}
          disabled={!query}
        >
          Get Weather
        </Button>
      </div>
      {data && (
        <WeatherCard data={data} units={units} onUnitChange={changeUnit} />
      )}
    </div>
  );
};

export default App;
