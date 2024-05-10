import { useState } from "react";

import "./App.css";
import WeatherInfo from "./components/WeatherInfo";
import SearchForm from "./components/SearchForm";
import TemperatureToggle from "./components/TemperatureToggle";
import { TempUnit } from "./types/weatherTypes";
import { UserSettings } from "./types/userSettings";
import useUserSettings from "./hooks/useUserSettings";
import useFavoriteLocations from "./hooks/useFavoriteLocations";
import FavoriteLocationsList from "./components/FavoriteLocationsList";

function App() {
  const [query, setQuery] = useState("");
  const { userSettings, setUserSettings } = useUserSettings();
  const {
    favoriteLocations,
    addLocationToFavorites,
    removeLocationFromFavorites,
  } = useFavoriteLocations();
  const [tempUnit, setTempUnit] = useState<TempUnit>(userSettings.tempUnit);

  const handleSearch = (query: string) => {
    setQuery(query);
  };

  const handleTemperatureToggle = (unit: TempUnit) => {
    setTempUnit(unit);
    setUserSettings((settings: UserSettings) => ({
      ...settings,
      tempUnit: unit,
    }));
  };

  return (
    <div className="wrapper">
      <header>
        <h1>My Weather App :)</h1>
        <TemperatureToggle
          unit={tempUnit}
          onUnitChange={handleTemperatureToggle}
        />
      </header>
      <main>
        <section className="search-form">
          <SearchForm onSubmit={handleSearch} />
        </section>
        {query && (
          <section className="weather-display">
            <WeatherInfo
              query={query}
              tempUnit={tempUnit}
              onAddToFavorites={addLocationToFavorites}
              favoriteLocations={favoriteLocations}
            />
          </section>
        )}
        <FavoriteLocationsList
          locations={favoriteLocations}
          onRemove={removeLocationFromFavorites}
          onSearch={handleSearch}
        />
      </main>
    </div>
  );
}

export default App;
