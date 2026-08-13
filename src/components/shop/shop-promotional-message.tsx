import { SymbolView } from "expo-symbols";
import { View } from "react-native";
import { useCSSVariable } from "uniwind";
import { Host } from "../ui/host";
import { Separator } from "../ui/separator";
import { Surface } from "../ui/surface";
import { ThemedText } from "../ui/themed-text";

export const ShopPromotionalMessage = ({
  promotionalMessage,
}: {
  promotionalMessage: string | undefined;
}) => {
  const primaryColor = useCSSVariable("--primary-color") as string;
  if (!promotionalMessage) return null;

  return (
    <Surface className="rounded-2xl p-0 border border-separator">
      <View className="flex-row items-center gap-x-2 p-3.5">
        <SymbolView
          name={{
            android: "campaign",
            ios: "megaphone",
          }}
          tintColor={primaryColor}
          size={20}
        />
        <ThemedText className="font-semibold">Promotional Message</ThemedText>
      </View>
      <Host matchContents={{ vertical: true }}>
        <Separator />
      </Host>
      <View className="p-3">
        <ThemedText className="text-muted text-xs">
          {promotionalMessage}
        </ThemedText>
      </View>
    </Surface>
  );
};
