import { ListGroup } from "@/components/ui/list-group";
import { Menu } from "@/components/ui/menu";
import { StyledSymbolView } from "@/components/ui/symbol-view";
import { ThemedText } from "@/components/ui/themed-text";
import { useAppTheme } from "@/context/app-theme-provider";
import { View } from "react-native";
import { ThemeName } from "uniwind";

export const ThemeSelector = () => {
  const { colors, currentTheme, setTheme } = useAppTheme();
  return (
    <ListGroup>
      <ListGroup.Item>
        <ListGroup.ItemContent>
          <ListGroup.ItemTitle>Select Theme</ListGroup.ItemTitle>
        </ListGroup.ItemContent>
        <ListGroup.ItemSuffix>
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
              <StyledSymbolView
                name={{
                  android: "unfold_more",
                  ios: "chevron.up.chevron.down",
                }}
                size={20}
                tintColorClassName={"accent-primary"}
              />
            </View>
          </Menu>
        </ListGroup.ItemSuffix>
      </ListGroup.Item>
    </ListGroup>
  );
};
