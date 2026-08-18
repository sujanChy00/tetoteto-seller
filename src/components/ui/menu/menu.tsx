import { useAppTheme } from "@/context/app-theme-provider";
import { DropdownMenuProps } from "@/types/components";
import { MenuView } from "@expo/ui/community/menu";

export const Menu = ({
  children,
  onValueChange,
  nativeOptions,
}: DropdownMenuProps) => {
  const { currentTheme } = useAppTheme();

  return (
    <MenuView
      colorScheme={currentTheme}
      actions={nativeOptions}
      onPressAction={(e) => {
        onValueChange(e.nativeEvent.event);
      }}
    >
      {children}
    </MenuView>
  );
};
