import { UIRowProps } from "@/types/components";
import { Row as UIRow } from "@expo/ui/jetpack-compose";
import { fillMaxWidth, padding } from "@expo/ui/jetpack-compose/modifiers";

export const Row = ({
  paddingHorizontal = 0,
  paddingVertical = 0,
  fillFullWidth,
  ...rest
}: UIRowProps) => {
  return (
    <UIRow
      {...rest}
      modifiers={[
        ...(fillFullWidth ? [fillMaxWidth()] : []),
        padding(
          paddingHorizontal,
          paddingVertical,
          paddingHorizontal,
          paddingVertical,
        ),
      ]}
    />
  );
};
