import { WiCelsius } from "react-icons/wi";
import { WiFahrenheit } from "react-icons/wi";
import { useSelector } from "react-redux";
import { BsThermometerHalf } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { BiWind } from "react-icons/bi";
import { BsSunrise as Sunrise } from "react-icons/bs";
import { BsSunset as Sunset } from "react-icons/bs";
import { BsArrowDown as MinTemp } from "react-icons/bs";
import { BsArrowUp as MaxTemp } from "react-icons/bs";
import { weatherIcons } from "../config";

const Current = ({ unit, toggleUnit, getLocation }) => {
  const currentWeatherData = useSelector(
    (state) => state.weather.currentWeatherData
  );

  const cityData = useSelector((state) => state.weather.cityData);

  const sunTime = (num) => {
    let date = new Date(num * 1000);
    let hours = `0${date.getHours()}`;
    let minutes = `0${date.getMinutes()}`;
    return `${hours.substring(hours.length - 2)}:${minutes.substring(
      minutes.length - 2
    )}`;
  };

  console.log(currentWeatherData);

  return (
    <div className="current-weather">
      <div className="current-weather-header">
        <h2>
          {getLocation
            ? `Current weather in ${currentWeatherData?.name}`
            : cityData
            ? `Current weather in ${cityData[0].name}`
            : "Current weather"}
        </h2>
        <button className="switch" onClick={toggleUnit}>
          {unit === "metric" ? (
            <WiCelsius className="weather-icon" size={35} />
          ) : (
            <WiFahrenheit className="weather-icon" size={35} />
          )}
        </button>
      </div>
      <div className="current-weather-body">
        <div className="current-weather-main">
          {currentWeatherData && (
            <img
              className="current-weather-image"
              src={weatherIcons[currentWeatherData.weather[0].main]}
              alt={currentWeatherData.weather[0].main}
            />
          )}
          <div className="current-weather-temp">
            <BsThermometerHalf className="weather-icon" size={35} />
            {Math.round(currentWeatherData?.main.temp)}&deg;
          </div>
        </div>
        <ul className="current-weather-details">
          <li className="current-weather-item">
            {currentWeatherData?.weather[0].main}
          </li>
          <li className="current-weather-item">
            <MinTemp className="weather-icon" />{" "}
            {Math.round(currentWeatherData?.main.temp_min)}&deg;{" "}
            <MaxTemp className="weather-icon" />{" "}
            {Math.round(currentWeatherData?.main.temp_max)}&deg;
          </li>
          <li className="current-weather-item">
            <WiHumidity className="weather-icon" size={30} /> Humidity{" "}
            {currentWeatherData?.main.humidity}%
          </li>
          <li className="current-weather-item">
            <BiWind className="weather-icon" size={30} /> Wind{" "}
            {currentWeatherData?.wind.speed.toFixed(1)}
            {unit === "metric" ? "m/s" : "m/h"}
          </li>
          <li className="current-weather-item">
            {currentWeatherData && (
              <>
                <Sunrise className="weather-icon" />{" "}
                <span> {sunTime(currentWeatherData.sys.sunrise)} </span>
                <Sunset className="weather-icon" />{" "}
                <span> {sunTime(currentWeatherData.sys.sunset)} </span>{" "}
              </>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Current;
