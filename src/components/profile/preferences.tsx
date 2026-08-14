import { View } from "react-native";
import { LanguageSelector } from "../layout/language-selector";
import { ThemeSelector } from "../layout/theme-selector/theme-selector";
import { Separator } from "../ui/separator";
import { ThemedText } from "../ui/themed-text";

export const Preferences = () => {
  return (
    <View>
      <ThemedText className="text-base font-medium px-2.5 pb-2.5">
        Preferences
      </ThemedText>
      <LanguageSelector />
      <Separator />
      <ThemeSelector />
      <Separator />
    </View>
  );
};
