import useCurrentWeather from "../../hooks/useCurrentWeather";
import { TempUnit } from "../../types/weatherTypes";
import Star from "../Star";

import styles from "./WeatherInfo.module.css";

interface Props {
  query?: string;
  tempUnit: TempUnit;
  onAddToFavorites?: (location: string) => void;
  favoriteLocations?: string[];
}

const WeatherInfo = ({
  query = "",
  tempUnit,
  onAddToFavorites,
  favoriteLocations = [],
}: Props) => {
  const { data, isLoading, isError, error } = useCurrentWeather(query);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (!data) {
    return null;
  }

  const iconUrl = `https:${data.current.condition.icon}`;
  const temperature =
    tempUnit === "C" ? data.current.temp_c : data.current.temp_f;
  const unit = tempUnit === "C" ? "°C" : "°F";
  const isFavorite = favoriteLocations.includes(data.location.name);
  const isButtonVisible = !isFavorite && !!onAddToFavorites;

  return (
    <div className={styles.wrapper}>
      {isButtonVisible ? (
        <Star
          className={styles.add}
          onClick={() => onAddToFavorites(data.location.name)}
        />
      ) : null}
      <h2 className={styles.title}>{data.location.name}</h2>
      <div className={styles.temperature}>
        <img src={iconUrl} alt={data.current.condition.text} />
        <div className={styles.temperatureValue}>
          <span className={styles.temperatureNumber}>
            {Math.ceil(temperature)}
          </span>
          <div className={styles.temperatureUnit}>{unit}</div>
        </div>
        <div className={styles.additionalInfo}>
          <span>Precipitation: {data.current.precip_mm}mm</span>
          <span>Humidity: {data.current.humidity}%</span>
          <span>Wind: {data.current.wind_kph} km/h</span>
        </div>
      </div>

      <div>{data.current.condition.text}</div>
    </div>
  );
};

export default WeatherInfo;
