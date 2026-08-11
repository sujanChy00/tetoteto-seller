import { UIRowProps } from "@/types/components";
import { Row as UIRow } from "@expo/ui";
import { frame, padding } from "@expo/ui/swift-ui/modifiers";

export const Row = ({
  fillFullWidth,
  paddingHorizontal,
  paddingVertical,
  ...rest
}: UIRowProps) => {
  return (
    <UIRow
      {...rest}
      modifiers={[
        ...(fillFullWidth
          ? [
              frame({
                maxWidth: Infinity,
              }),
            ]
          : []),
        padding({
          horizontal: paddingHorizontal,
          vertical: paddingVertical,
        }),
      ]}
    />
  );
};
