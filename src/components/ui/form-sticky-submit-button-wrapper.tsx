import { KeyboardStickyView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
  closed?: number;
  opened?: number;
}

export const FormStickySubmitButtonWrapper = ({
  closed = -16,
  opened = 20,
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
        opened: bottom - opened,
        closed: closed,
      }}
    >
      {children}
    </KeyboardStickyView>
  );
};
