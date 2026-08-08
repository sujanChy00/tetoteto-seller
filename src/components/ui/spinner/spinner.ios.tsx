import { UiSpinnerProps } from "@/types/components";
import { ProgressView } from "@expo/ui/swift-ui";
import { frame, tint } from "@expo/ui/swift-ui/modifiers";

export const UISpinner = ({ size = 35, color }: UiSpinnerProps) => {
  return (
    <ProgressView
      value={0.5}
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
