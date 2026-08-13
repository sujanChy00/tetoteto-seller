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
  const [open, setOpen] = useState(false);
  return (
    <Surface className="p-0 border border-separator overflow-hidden">
      <Host matchContents={{ vertical: true }}>
        <Collapsible
          isOpen={open}
          onOpenChange={setOpen}
          label="Supported Prefectures"
          labelStyle={{
            fontWeight: "600",
          }}
        >
          <RNHostView matchContents>
            {prefectures?.length ? (
              <View className="p-3 flex-row items-center gap-3 flex-wrap border-t border-t-separator">
                {prefectures?.map((prefecture) => (
                  <Chip.Root
                    variant="soft"
                    color="success"
                    size="sm"
                    key={prefecture.id}
                    className="rounded-md"
                  >
                    <Chip.Label>{prefecture.name}</Chip.Label>
                  </Chip.Root>
                ))}
              </View>
            ) : (
              <ThemedText className="px-4 italic">
                No prefectures available
              </ThemedText>
            )}
          </RNHostView>
        </Collapsible>
      </Host>
    </Surface>
  );
};
