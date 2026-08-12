import { Host } from "@/components/ui/host";
import { Menu } from "@/components/ui/menu";
import { LanguageLists } from "@/constants/data";
import { useAppTheme } from "@/context/app-theme-provider";
import { useLanguage } from "@/hooks/use-language";
import { Row, Spacer, Text } from "@expo/ui";

export const LanguageSelector = () => {
  const { colors } = useAppTheme();
  const { language, setLanguage, t } = useLanguage();

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
          {t("change_langauge")}
        </Text>
        <Spacer flexible />
        <Menu options={LanguageLists} onSelect={setLanguage} value={language} />
      </Row>
    </Host>
  );
};
