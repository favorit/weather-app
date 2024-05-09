import styles from "./TemperatureToggle.module.css";
import { TempUnit } from "../../types/weatherTypes";

interface Props {
  unit: TempUnit;
  onUnitChange: (unit: TempUnit) => void;
}

const TemperatureToggle = ({ unit = "C", onUnitChange }: Props) => {
  const toggleUnit = () => {
    const newUnit = unit === "C" ? "F" : "C";
    onUnitChange(newUnit);
  };

  return (
    <div className={styles.unit}>
      <div
        className={unit === "C" ? styles.selected : styles.clickable}
        onClick={unit === "C" ? undefined : toggleUnit}
        data-testid={unit === "C" ? "selected" : "clickable"}
      >
        °C
      </div>
      <div className={styles.separator} />
      <div
        className={unit === "F" ? styles.selected : styles.clickable}
        onClick={unit === "F" ? undefined : toggleUnit}
        data-testid={unit === "F" ? "selected" : "clickable"}
      >
        °F
      </div>
    </div>
  );
};

export default TemperatureToggle;
