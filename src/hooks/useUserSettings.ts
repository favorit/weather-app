import { UserSettings } from "../types/userSettings";
import { TempUnit } from "../types/weatherTypes";
import useLocalStorage from "./useLocalStorage";

const DEFAULT_USER_SETTINGS = {
  tempUnit: "C" as TempUnit,
};

const useUserSettings = () => {
  const [userSettings, setUserSettings] = useLocalStorage<UserSettings>(
    "weather-user-settings",
    DEFAULT_USER_SETTINGS
  );

  return { userSettings, setUserSettings } as const;
};

export default useUserSettings;
