import { UiSpinnerProps } from "@/types/components";
import { ProgressView } from "@expo/ui/swift-ui";
import { frame, tint } from "@expo/ui/swift-ui/modifiers";

export const Spinner = ({ size = 35, color }: UiSpinnerProps) => {
  return (
    <ProgressView
      modifiers={[
        frame({
          height: size,
          width: size,
        }),
        ...(color ? [tint(color)] : []),
      ]}
    />
  );
};
