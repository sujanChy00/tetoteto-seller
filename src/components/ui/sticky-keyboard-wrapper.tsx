import { KeyboardStickyView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
  closedOffset?: number;
  openedOffset?: number;
}

export const StickyKeyboardWrapper = ({
  closedOffset = -16,
  openedOffset = 20,
  children,
}: Props) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <KeyboardStickyView
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
      }}
      offset={{
        opened: bottom - openedOffset,
        closed: closedOffset,
      }}
    >
      {children}
    </KeyboardStickyView>
  );
};
