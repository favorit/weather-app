import useCurrentWeather from "../../hooks/useCurrentWeather";

interface Props {
  query?: string;
}

const WeatherInfo = ({ query = "" }: Props) => {
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

  return (
    <>
      <h1>Weather in {data.location.name}</h1>
      <p>Temperature: {data.current.temp_c}°C</p>
      <p>Condition: {data.current.condition.text}</p>
    </>
  );
};

export default WeatherInfo;
