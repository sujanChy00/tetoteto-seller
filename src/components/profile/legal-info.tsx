import { useLanguage } from "@/hooks/use-language";
import { ILanguageTexts } from "@/types";
import type { LinkProps } from "expo-router";
import { useRouter } from "expo-router";
import { AndroidSymbol, SFSymbol } from "expo-symbols";
import { TouchableOpacity, View } from "react-native";
import { Fragment } from "react/jsx-runtime";
import { Separator } from "../ui/separator";
import { StyledSymbolView } from "../ui/symbol-view";
import { ThemedText } from "../ui/themed-text";

const LINKS: {
  title: ILanguageTexts;
  href: LinkProps["href"];
  icon: { ios: SFSymbol; android: AndroidSymbol };
}[] = [
  {
    title: "terms_condition",
    href: "/terms-condition",
    icon: {
      ios: "doc.text",
      android: "description",
    },
  },
  {
    title: "privacy_policy",
    href: "/privacy-policy",
    icon: {
      ios: "hand.raised",
      android: "privacy_tip",
    },
  },
];

export const LegalInfo = () => {
  const { t } = useLanguage();
  const router = useRouter();
  return (
    <View>
      <ThemedText className="text-base font-medium px-2.5 pb-2.5">
        Legal Info
      </ThemedText>

      {LINKS.map((item, index) => (
        <Fragment key={String(index)}>
          <TouchableOpacity
            className="p-4"
            onPress={() => {
              router.push(item.href);
            }}
          >
            <View className="flex-row items-center justify-between gap-3">
              <View className="flex-row items-center gap-1 flex-1">
                <StyledSymbolView
                  size={20}
                  tintColorClassName={"accent-foreground"}
                  name={{
                    android: item.icon.android,
                    ios: item.icon.ios,
                  }}
                />
                <ThemedText numberOfLines={1} className="flex-1">
                  {t(item.title)}
                </ThemedText>
              </View>
              <StyledSymbolView
                size={20}
                tintColorClassName={"accent-muted"}
                name={{
                  android: "chevron_right",
                  ios: "chevron.right",
                }}
              />
            </View>
          </TouchableOpacity>
          <Separator />
        </Fragment>
      ))}
    </View>
  );
};
