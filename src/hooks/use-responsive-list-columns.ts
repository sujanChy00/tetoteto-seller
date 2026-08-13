import { useWindowDimensions } from "react-native";

const TABLET_BREAKPOINT = 768;

export const useResponsiveListColumns = (
  mobileColumns = 1,
  tabletColumns = 2,
) => {
  const { width } = useWindowDimensions();
  const numColumns = width >= TABLET_BREAKPOINT ? tabletColumns : mobileColumns;
  return { numColumns };
};
