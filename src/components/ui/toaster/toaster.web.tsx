import { useAppTheme } from "@/context/app-theme-provider";
import { SymbolView } from "expo-symbols";
import { ActivityIndicator } from "react-native";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export const Toaster = () => {
  const { currentTheme } = useAppTheme();
  return (
    <Sonner
      theme={currentTheme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <SymbolView
            name={{
              web: "check_circle",
            }}
            size={16}
          />
        ),
        info: (
          <SymbolView
            name={{
              web: "info",
            }}
            size={16}
          />
        ),
        warning: (
          <SymbolView
            name={{
              web: "warning",
            }}
            size={16}
          />
        ),
        error: (
          <SymbolView
            name={{
              web: "dangerous",
            }}
            size={16}
          />
        ),
        loading: <ActivityIndicator size={16} />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
    />
  );
};
