import { useState } from "react";

import "./App.css";
import WeatherInfo from "./components/WeatherInfo";
import SearchForm from "./components/SearchForm";
import TemperatureToggle from "./components/TemperatureToggle";
import { TempUnit } from "./types/weatherTypes";
import useLocalStorage from "./hooks/useLocalStorage";
import { UserSettings } from "./types/userSettings";

function App() {
  const [query, setQuery] = useState("");
  const [userSettings, setUserSettings] = useLocalStorage<UserSettings>(
    "user-settings",
    {
      tempUnit: "C",
    }
  );
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
        <section className="weather-display">
          <WeatherInfo query={query} tempUnit={tempUnit} />
        </section>
        <section className="favorites">favorite locations</section>
      </main>
    </div>
  );
}

export default App;
