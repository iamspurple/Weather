import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ID, API_URL } from "../config";

export const getCity = createAsyncThunk(
  "city",
  async (city, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_ID}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong, please try again!");
      }

      const json = await response.json();

      if (!json || json?.length === 0) {
        throw new Error(`Data for ${city} is not found!`);
      }

      return json;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getForecast = createAsyncThunk("forecast", async (obj) => {
  const response = await fetch(
    `${API_URL}/data/2.5/forecast?lat=${obj.lat}&lon=${obj.lon}&appid=${API_ID}&units=${obj.unit}`
  );

  if (!response.ok) {
    throw new Error("Getting forecast data error");
  }

  return await response.json();
});

export const getCurrentWeather = createAsyncThunk(
  "current weather",
  async (obj) => {
    const response = await fetch(
      `${API_URL}/data/2.5/weather?lat=${obj.lat}&lon=${obj.lon}&appid=${API_ID}&units=${obj.unit}`
    );

    if (!response.ok) {
      throw new Error("Getting current weather data error");
    }

    return await response.json();
  }
);

const initialState = {
  cityData: null,
  cityLoading: false,
  cityError: null,

  forecastData: null,
  forecastLoading: false,
  forecastError: null,

  currentWeatherData: null,
  currentWeatherLoading: false,
  currentWeatherError: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  extraReducers: (builder) => {
    // getCity
    builder.addCase(getCity.pending, (state) => {
      state.cityLoading = true;
    });
    builder.addCase(getCity.fulfilled, (state, action) => {
      (state.cityLoading = false),
        (state.cityData = action.payload),
        (state.cityError = null);
    });
    builder.addCase(getCity.rejected, (state, action) => {
      (state.cityData = null),
        (state.cityLoading = false),
        (state.cityError = action.payload);
    });
    // getForeCast
    builder.addCase(getForecast.pending, (state) => {
      state.forecastLoading = true;
    });
    builder.addCase(getForecast.fulfilled, (state, action) => {
      (state.forecastLoading = false), (state.forecastData = action.payload);
    });
    builder.addCase(getForecast.rejected, (state, action) => {
      (state.forecastData = null),
        (state.forecastLoading = false),
        (state.forecastError = action.error);
    });
    //getCurrentWeather
    builder.addCase(getCurrentWeather.pending, (state) => {
      state.currentWeatherLoading = true;
    });
    builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
      (state.currentWeatherLoading = false),
        (state.currentWeatherData = action.payload);
    });
    builder.addCase(getCurrentWeather.rejected, (state, action) => {
      (state.currentWeatherData = null),
        (state.currentWeatherLoading = false),
        (state.currentWeatherError = action.error);
    });
  },
});

export default weatherSlice.reducer;
