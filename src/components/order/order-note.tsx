import { SymbolView } from "expo-symbols";
import { View } from "react-native";
import { useCSSVariable } from "uniwind";
import { Card } from "../ui/card";
import { ThemedText } from "../ui/themed-text";

export const OrderNote = ({ note }: { note: string | undefined }) => {
  const [primaryColor] = useCSSVariable(["--color-primary"]);
  if (!note) return null;
  return (
    <Card className="gap-3">
      <View className="flex-row items-center gap-1">
        <ThemedText className="text-xs font-semibold">NOTES:</ThemedText>
        <SymbolView
          name={{
            android: "sticky_note_2",
            ios: "note.text",
          }}
          size={15}
          tintColor={primaryColor as string}
        />
      </View>
      <View className="bg-surface-secondary rounded-lg p-3">
        <ThemedText className="text-xs italic text-muted">{note}</ThemedText>
      </View>
    </Card>
  );
};
