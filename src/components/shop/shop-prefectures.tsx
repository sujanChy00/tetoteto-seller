import { SupportedPrefectures } from "@/types";
import { View } from "react-native";
import { Accordion } from "../ui/accordion";
import { Chip } from "../ui/chip";
import { ThemedText } from "../ui/themed-text";

export const ShopPrefectures = ({
  prefectures,
}: {
  prefectures: SupportedPrefectures[] | undefined;
}) => {
  return (
    <Accordion
      selectionMode="single"
      isCollapsible
      variant="surface"
      className="border border-separator"
    >
      <Accordion.Item value="prefectures">
        <Accordion.Trigger className="py-5">
          <ThemedText className="flex-1">Supported Prefectures</ThemedText>
          <Accordion.Indicator />
        </Accordion.Trigger>
        <Accordion.Content>
          {prefectures?.length ? (
            <View className="p-3 flex-row items-center gap-3 flex-wrap border-t-hairline border-t-separator">
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
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};
