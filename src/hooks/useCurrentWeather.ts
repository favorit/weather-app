import { useQuery } from "@tanstack/react-query";
import { fetchCurrentWeather } from "../services/weatherServices";
import { WeatherApiResponse } from "../types/weatherTypes";

const useCurrentWeather = (query: string) => {
  return useQuery<WeatherApiResponse, Error>({
    queryKey: [`weather${query}`],
    queryFn: () => fetchCurrentWeather(query),
    staleTime: 10 * 60 * 1000,
    networkMode: "offlineFirst",
    enabled: !!query,
  });
};

export default useCurrentWeather;
