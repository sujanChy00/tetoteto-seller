import { Menu } from "@/components/ui/menu";
import { ThemedText } from "@/components/ui/themed-text";
import { useAppTheme } from "@/context/app-theme-provider";
import { SymbolView } from "expo-symbols";
import { View } from "react-native";
import { ThemeName } from "uniwind";

export const ThemeSelector = () => {
  const { colors, currentTheme, setTheme } = useAppTheme();
  return (
    <View className="flex-row items-center justify-between p-4">
      <ThemedText>Select Theme</ThemedText>
      <Menu
        nativeOptions={[
          {
            id: "dark",
            title: "Dark",
            state: currentTheme === "dark" ? "on" : "off",
          },
          {
            id: "light",
            title: "Light",
            state: currentTheme === "light" ? "on" : "off",
          },
        ]}
        onValueChange={(theme) => {
          setTheme(theme as ThemeName);
        }}
      >
        <View className="flex-row items-center">
          <ThemedText className="text-primary capitalize">
            {currentTheme}
          </ThemedText>
          <SymbolView
            name={{
              android: "unfold_more",
              ios: "chevron.up.chevron.down",
            }}
            size={20}
            tintColor={colors.primary}
          />
        </View>
      </Menu>
    </View>
  );
};
