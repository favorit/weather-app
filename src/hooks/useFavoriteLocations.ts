import useLocalStorage from "./useLocalStorage";

const MAX_LOCATIONS = 10;

const useFavoriteLocations = () => {
  const [favoriteLocations, setFavoriteLocations] = useLocalStorage<string[]>(
    "weather-favorite-locations",
    []
  );

  const addLocationToFavorites = (location: string) => {
    if (favoriteLocations.length >= MAX_LOCATIONS) {
      alert("Maximum of 10 locations can be added.");
      return;
    }
    if (!favoriteLocations.includes(location)) {
      setFavoriteLocations([...favoriteLocations, location]);
    }
  };

  // Function to remove a location from the favorites
  const removeLocationFromFavorites = (location: string) => {
    setFavoriteLocations(
      favoriteLocations.filter((item: string) => item !== location)
    );
  };

  return {
    favoriteLocations,
    addLocationToFavorites,
    removeLocationFromFavorites,
  } as const;
};

export default useFavoriteLocations;
