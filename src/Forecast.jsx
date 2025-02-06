import { useSelector } from "react-redux"
import { weatherIcons } from "./config"

const Forecast = () => {
 
    const forecastData = useSelector(state => state.weather.forecastData)
 
    const fiveDayForecastFunc = (forecastData) => {
        if (!forecastData) {
            return []
        }; 
        
        const result = [];

        for (let i = 0; i < forecastData.length; i+=8) {
            result.push(forecastData[i])
        }

        return result
    }

    const fiveDays = (fiveDayForecastFunc(forecastData?.list))
    console.log(fiveDays)

    return (
        <div className="forecast">
            <ul className="forecast-list">
                {fiveDays.map((item) => {
                    const options = {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'short'
                    }
                    const date = new Date(item.dt*1000).toLocaleDateString('en-US', options);

                    return(
                        <li className="forecast-item" key={item.dt}>
                         {date}
                         <img  className='forecast-image' src={weatherIcons[item.weather[0].main]} alt={item.weather[0].main} />
                         {item.main.temp}&deg;
                        </li>
                    )
                })}
            </ul>
        </div>
    )

}

export default Forecast
