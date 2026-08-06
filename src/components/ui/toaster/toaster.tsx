import { useAppTheme } from "@/context/app-theme-provider";
import { Toaster as SonnerToaster } from "sonner-native";

export const Toaster = () => {
  const { currentTheme } = useAppTheme();
  return (
    <SonnerToaster
      position={"top-center"}
      swipeToDismissDirection={"up"}
      visibleToasts={3}
      closeButton
      autoWiggleOnUpdate={"always"}
      theme={currentTheme}
      enableStacking
      richColors
      invert
      allowFontScaling
      toastOptions={{
        actionButtonStyle: {
          paddingHorizontal: 20,
        },
      }}
      pauseWhenPageIsHidden
    />
  );
};
