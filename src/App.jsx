import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import { getCity, getCurrentWeather, getForecast} from './store/weatherSlice';
import { useSelector } from 'react-redux';
import InputForm from './сomponents/InputForm';
import Current from './сomponents/Current';
import { StageSpinner } from 'react-spinners-kit';
import Forecast from './Forecast';

function App() {

  const {cityLoading, forecastLoading} = useSelector(state => state.weather);

  

  const [loading, setLoading] = useState(true);

  const allLoadings = [cityLoading, forecastLoading];

  useEffect(() => {
    const isLoading = allLoadings.some(state => state);
    setLoading(isLoading)
  }, [allLoadings])
   
  const [city, setCity] = useState('Moscow');

  const [unit, setUnit] = useState('metric');

  const toggleUnit = () => {
    setLoading(true)
    setUnit(unit === 'metric' ? 'imperial' : 'metric')
  }

  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(getCity(city))
    .then((data) => ( dispatch(getCurrentWeather({lat: data.payload[0].lat, lon:data.payload[0].lon, unit})),
     dispatch(getForecast({lat: data.payload[0].lat, lon:data.payload[0].lon, unit}))))

    
  }

  useEffect(() => {
    fetchData()
  },[unit])

  const handleSearch = (e) => {
    e.preventDefault()
    setLoading(true)
    fetchData()
  }
    

  return (
    <>
      <InputForm handleSearch={handleSearch} loading={loading} city={city} setCity={setCity}/>
      <div className="container">
       {loading ? <StageSpinner/> : <><Current unit={unit} toggleUnit={toggleUnit}/> <Forecast/> </>}
        
      </div>
    </>
  )
}

export default App
