import { useSelector } from "react-redux";
import { weatherIcons } from "../config";

const Forecast = () => {
  const forecastData = useSelector((state) => state.weather.forecastData);

  const fiveDayForecastFunc = (forecastData) => {
    if (!forecastData) {
      return [];
    }

    const result = [];

    for (let i = 0; i < forecastData.length; i += 8) {
      result.push(forecastData[i]);
    }

    return result;
  };

  const fiveDays = fiveDayForecastFunc(forecastData?.list);

  return (
    <div className="forecast">
      <h2 className="forecast-header">5 day forecast</h2>
      <ul className="forecast-list">
        {fiveDays.map((item) => {
          const options = {
            weekday: "short",
            day: "numeric",
            month: "short",
          };
          const date = new Date(item.dt * 1000).toLocaleDateString(
            "en-US",
            options
          );

          return (
            <li className="forecast-item" key={item.dt}>
              {date}
              <div className="forecast-item-info">
                <img
                  className="forecast-image"
                  src={weatherIcons[item.weather[0].main]}
                  alt={item.weather[0].main}
                />
                {Math.round(item.main.temp)}&deg;
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Forecast;
