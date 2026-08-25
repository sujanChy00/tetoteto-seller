import { SupportedPrefectures } from "@/types";
import { Collapsible, RNHostView } from "@expo/ui";
import { useState } from "react";
import { View } from "react-native";
import { Chip } from "../ui/chip";
import { Host } from "../ui/host";
import { Surface } from "../ui/surface";
import { ThemedText } from "../ui/themed-text";

export const ShopPrefectures = ({
  prefectures,
}: {
  prefectures: SupportedPrefectures[] | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Surface className="p-0 border border-separator rounded-2xl">
      <Host matchContents={{ vertical: true }}>
        <Collapsible
          label="Supported Prefectures"
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          <RNHostView matchContents>
            <View className="p-3 ">
              {prefectures?.length ? (
                <View className="flex-row items-center gap-3 flex-wrap border-t-hairline border-t-separator">
                  {prefectures?.map((prefecture) => (
                    <Chip
                      variant="soft"
                      color="success"
                      key={prefecture.id}
                      className="p-2"
                    >
                      <ThemedText>{prefecture.name}</ThemedText>
                    </Chip>
                  ))}
                </View>
              ) : (
                <ThemedText className="text-muted italic">
                  No prefectures available
                </ThemedText>
              )}
            </View>
          </RNHostView>
        </Collapsible>
      </Host>
    </Surface>
  );
};
