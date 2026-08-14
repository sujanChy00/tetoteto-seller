import { useLanguage } from "@/hooks/use-language";
import { ILanguageTexts } from "@/types";
import type { LinkProps } from "expo-router";
import { useRouter } from "expo-router";
import { AndroidSymbol, SFSymbol, SymbolView } from "expo-symbols";
import { TouchableOpacity, View } from "react-native";
import { Fragment } from "react/jsx-runtime";
import { useCSSVariable } from "uniwind";
import { Separator } from "../ui/separator";
import { ThemedText } from "../ui/themed-text";

const LINKS: {
  title: ILanguageTexts;
  href: LinkProps["href"];
  icon: { ios: SFSymbol; android: AndroidSymbol };
}[] = [
  {
    title: "update_profile",
    href: "/profile/update",
    icon: {
      ios: "person.crop.circle",
      android: "person",
    },
  },
  {
    title: "change_password",
    href: "/profile/update-password",
    icon: {
      android: "lock",
      ios: "lock",
    },
  },
];

export const SecurityLinks = () => {
  const { t } = useLanguage();
  const mutedColor = useCSSVariable("--color-muted");
  const foregroundColor = useCSSVariable("--color-foreground");

  const router = useRouter();
  return (
    <View>
      <ThemedText className="text-base font-medium px-2.5 pb-2.5">
        Security
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
                <SymbolView
                  size={20}
                  tintColor={foregroundColor as string}
                  name={{
                    android: item.icon.android,
                    ios: item.icon.ios,
                  }}
                />
                <ThemedText numberOfLines={1} className="flex-1">
                  {t(item.title)}
                </ThemedText>
              </View>
              <SymbolView
                size={20}
                tintColor={mutedColor as string}
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
