import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./App.css";
import WeatherInfo from "./components/WeatherInfo";

// Create a client
const queryClient = new QueryClient();

function App() {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("searching for weather");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="wrapper">
        <header>
          <h1>My Weather App</h1>
        </header>
        <main>
          <section className="search-form">
            <form onSubmit={handleSearch}>
              <input type="text" name="q" placeholder="Enter location" />
              <button type="submit">Get Weather</button>
            </form>
          </section>
          <section className="weather-display">
            <WeatherInfo />
          </section>

          <section className="favorites">favorite locations</section>
        </main>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
