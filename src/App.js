import { Button, Autocomplete, TextField } from "@mui/material";
import React, {useEffect} from "react";
import WeatherManager from "./api";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import cities from "./cities.json";

const App = () => {
  const [query, setQuery] = React.useState("");
  const [data, setData] = React.useState(null);
  const [units, setUnits] = React.useState("F");
  const [citiesData, setCitiesData] = React.useState([]);

  useEffect(() => {
    let tempCitiesArray = new Set();
    cities.forEach(city => {
      tempCitiesArray.add(city.name);
    });

    cities = [...tempCitiesArray].map(city => {
      return {
        label: city
      };
    });

  }, []);

  const handleQueryChange = (event, newValue) => {
    if (event?.type === "change") {
      setQuery(newValue);

      if (newValue.length > 3) {
        let tempCities = cities.filter((city) =>
          city.label.toLowerCase().startsWith(newValue.toLowerCase())
        );

        setCitiesData(tempCities);
      } else {
        setCitiesData([]);
      }
    } else {
      setCitiesData([]);
    }
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
        <Autocomplete
          disablePortal
          options={citiesData}
          sx={{ width: 256 }}
          freeSolo
          value={query}
          onChange={(event, newValue) => {
            setQuery(newValue === null ? "" : newValue.label);
          }}
          inputValue={query}
          onInputChange={(event, newValue) => handleQueryChange(event, newValue)}
          renderInput={(params) => (
            <TextField {...params} label="City" />
          )}
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
