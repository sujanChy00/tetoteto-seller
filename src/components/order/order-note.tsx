import { View } from "react-native";
import { Card } from "../ui/card";
import { StyledSymbolView } from "../ui/symbol-view";
import { ThemedText } from "../ui/themed-text";

export const OrderNote = ({ note }: { note: string | undefined }) => {
  if (!note) return null;
  return (
    <Card className="gap-3">
      <View className="flex-row items-center gap-1">
        <ThemedText className="text-xs font-semibold">NOTES:</ThemedText>
        <StyledSymbolView
          name={{
            android: "sticky_note_2",
            ios: "note.text",
          }}
          size={15}
          tintColorClassName={"accent-primary"}
        />
      </View>
      <View className="bg-surface-secondary rounded-lg p-3">
        <ThemedText className="text-xs italic text-muted">{note}</ThemedText>
      </View>
    </Card>
  );
};
