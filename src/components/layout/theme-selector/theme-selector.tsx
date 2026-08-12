import { Host } from "@/components/ui/host";
import { Menu } from "@/components/ui/menu";
import { useAppTheme } from "@/context/app-theme-provider";
import { Icon, Row, Spacer, Text } from "@expo/ui";
import { ThemeName } from "uniwind";

const LIGHT_ICON = Icon.select({
  ios: "sun.max",
  android: require("@expo/material-symbols/light_mode.xml"),
});

const DARK_ICON = Icon.select({
  ios: "moon",
  android: require("@expo/material-symbols/dark_mode.xml"),
});

const CHEVRON_UP_DOWN = Icon.select({
  ios: "chevron.up.chevron.down",
  android: require("@expo/material-symbols/unfold_more.xml"),
});

export const ThemeSelector = () => {
  const { colors, currentTheme, setTheme } = useAppTheme();
  return (
    <Host
      matchContents={{ vertical: true }}
      style={{
        width: "100%",
      }}
    >
      <Row
        alignment="center"
        spacing={12}
        style={{ paddingLeft: 16, paddingVertical: 4 }}
      >
        <Text
          textStyle={{
            color: colors.text as string,
          }}
        >
          Select Theme
        </Text>
        <Spacer flexible />
        <Menu
          options={[
            {
              label: "Dark",
              value: "dark",
            },
            {
              label: "Light",
              value: "light",
            },
          ]}
          onSelect={(theme) => setTheme(theme as ThemeName)}
          value={currentTheme}
        />
      </Row>
    </Host>
  );
};
