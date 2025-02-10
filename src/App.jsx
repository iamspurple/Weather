import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { getCity, getCurrentWeather, getForecast } from "./store/weatherSlice";
import { useSelector } from "react-redux";
import InputForm from "./сomponents/InputForm";
import Current from "./сomponents/Current";
import { StageSpinner } from "react-spinners-kit";
import Forecast from "./сomponents/Forecast";
import ErrorMessage from "./сomponents/ErrorMessage";

function App() {
  const { cityData, cityLoading, forecastLoading, cityError } = useSelector(
    (state) => state.weather
  );

  const [loading, setLoading] = useState(true);

  const allLoadings = [cityLoading, forecastLoading];

  useEffect(() => {
    const isLoading = allLoadings.some((state) => state);
    setLoading(isLoading);
  }, [allLoadings]);

  const [city, setCity] = useState("Moscow");

  const [unit, setUnit] = useState("metric");

  const toggleUnit = () => {
    setLoading(true);
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  const dispatch = useDispatch();

  const fetchData = async () => {
    const data = await dispatch(getCity(city)).unwrap();

    if (!data || data?.length === 0) return;

    const [{ lat, lon }] = data;

    dispatch(
      getCurrentWeather({
        lat,
        lon,
        unit,
      })
    );

    dispatch(
      getForecast({
        lat,
        lon,
        unit,
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, [unit]);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchData();
  };

  return (
    <>
      <InputForm
        handleSearch={handleSearch}
        loading={loading}
        city={city}
        setCity={setCity}
      />
      <div className="container">
        {loading === true && <StageSpinner />}

        {loading === false && cityData?.length > 0 && (
          <>
            <Current unit={unit} toggleUnit={toggleUnit} />
            <Forecast />{" "}
          </>
        )}

        {loading === false && cityError !== null && (
          <ErrorMessage text={cityError} />
        )}
        {loading === false && cityData?.length == 0 && (
          <ErrorMessage text={"No data found"} />
        )}
      </div>
    </>
  );
}

export default App;
