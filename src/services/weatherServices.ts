import { WeatherApiResponse } from "../types/weatherTypes";

export const fetchCurrentWeather = async (
  query: string
): Promise<WeatherApiResponse> => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  return response.json();
};
