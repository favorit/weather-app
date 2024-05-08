import React from "react";
import "./App.css";

function App() {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("searching for weather");
  };

  return (
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
        <section className="weather-display">location weather info</section>
        <section className="favorites">favorite locations</section>
      </main>
    </div>
  );
}

export default App;
