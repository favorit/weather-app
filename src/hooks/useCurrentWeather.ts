import { useQuery } from "@tanstack/react-query";

interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

interface CurrentWeather {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

interface WeatherApiResponse {
  location: Location;
  current: CurrentWeather;
}
const fetchCurrentWeather = async (
  query: string
): Promise<WeatherApiResponse> => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const useCurrentWeather = (query: string) => {
  return useQuery<WeatherApiResponse, Error>({
    queryKey: ["weather"],
    queryFn: () => fetchCurrentWeather(query),
    staleTime: 10 * 60 * 1000,
    networkMode: "offlineFirst",
  });
};

export default useCurrentWeather;
