import styles from "./FavoriteLocationsList.module.css";

interface Props {
  locations: string[];
  onRemove: (location: string) => void;
}

const FavoriteLocationsList = ({ locations, onRemove }: Props) => {
  if (locations.length === 0) {
    return null;
  }
  return (
    <ul className={styles.list}>
      {locations.map((location) => (
        <li className={styles.item} key={location}>
          <span>{location}</span>
          <span
            className={styles.removeButton}
            onClick={() => onRemove(location)}
          >
            x
          </span>
        </li>
      ))}
    </ul>
  );
};

export default FavoriteLocationsList;
