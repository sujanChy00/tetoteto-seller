import { useAppTheme } from "@/context/app-theme-provider";
import { Button } from "react-native";

export const ThemeToggler = () => {
  const { toggleTheme, isDark } = useAppTheme();
  return <Button title="toggle theme" onPress={toggleTheme} />;
};
