import { Menu } from "@/components/ui/menu";
import { StyledSymbolView } from "@/components/ui/symbol-view";
import { ThemedText } from "@/components/ui/themed-text";
import { LanguageLists } from "@/constants/data";
import { useLanguage } from "@/hooks/use-language";
import { useMemo } from "react";
import { View } from "react-native";

export const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  const selectedLabel = useMemo(() => {
    return LanguageLists.find((l) => l.value === language)?.label;
  }, [language]);

  return (
    <View className="flex-row items-center justify-between p-4">
      <ThemedText>{t("change_langauge")}</ThemedText>
      <View className="flex-1 items-end">
        <Menu
          nativeOptions={LanguageLists.map((l) => ({
            title: l.label,
            id: l.value,
            state: l.value === language ? "on" : "off",
          }))}
          onValueChange={(lan) => {
            setLanguage(lan);
          }}
        >
          <View className="flex-row items-center gap-1 justify-end">
            <ThemedText
              numberOfLines={1}
              className="text-primary capitalize shrink"
            >
              {selectedLabel}
            </ThemedText>
            <StyledSymbolView
              style={{
                flexShrink: 0,
              }}
              name={{ android: "unfold_more", ios: "chevron.up.chevron.down" }}
              size={20}
              tintColorClassName={"accent-primary"}
            />
          </View>
        </Menu>
      </View>
    </View>
  );
};
