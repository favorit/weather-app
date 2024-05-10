import Star from "../Star";
import styles from "./FavoriteLocationsList.module.css";

interface Props {
  locations: string[];
  onRemove: (location: string) => void;
  onSearch: (query: string) => void;
}

const FavoriteLocationsList = ({ locations, onRemove, onSearch }: Props) => {
  if (locations.length === 0) {
    return null;
  }

  const handleRemove =
    (location: string) =>
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      onRemove(location);
    };

  return (
    <ul className={styles.list}>
      {locations.map((location) => (
        <li
          className={styles.item}
          onClick={() => onSearch(location)}
          key={location}
        >
          <span>{location}</span>
          <Star isFilled onClick={handleRemove(location)} />
        </li>
      ))}
    </ul>
  );
};

export default FavoriteLocationsList;
