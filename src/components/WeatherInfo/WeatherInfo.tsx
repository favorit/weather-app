import useCurrentWeather from "../../hooks/useCurrentWeather";
import { TempUnit } from "../../types/weatherTypes";

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
  const temp = tempUnit === "C" ? data.current.temp_c : data.current.temp_f;
  const unit = tempUnit === "C" ? "°C" : "°F";
  const isFavorite = favoriteLocations.includes(data.location.name);
  const isButtonVisible = !isFavorite && !!onAddToFavorites;

  return (
    <div className={styles.wrapper}>
      {isButtonVisible ? (
        <button
          onClick={() => onAddToFavorites(data.location.name)}
          className={styles.addButton}
        >
          +
        </button>
      ) : null}
      <h1>{data.location.name}</h1>
      <div className={styles.temperature}>
        <img src={iconUrl} alt={data.current.condition.text} />
        {temp}
        {unit}
      </div>
      <p>{data.current.condition.text}</p>
    </div>
  );
};

export default WeatherInfo;
