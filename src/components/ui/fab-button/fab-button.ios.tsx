import { FabButtonProps } from "@/types/components";
import { Button } from "@expo/ui/swift-ui";
import { buttonStyle, labelStyle } from "@expo/ui/swift-ui/modifiers";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";
import { Host } from "../host";

export const FabButton = ({ className, onPress }: FabButtonProps) => {
  return (
    <View
      className={twMerge(
        "absolute bottom-safe-offset-8 right-safe-offset-6 z-20",
        className,
      )}
    >
      <Host matchContents>
        <Button
          onPress={onPress}
          label="Add"
          systemImage="plus"
          modifiers={[labelStyle("iconOnly"), buttonStyle("glassProminent")]}
        />
      </Host>
    </View>
  );
};
