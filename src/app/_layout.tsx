import { NAV_THEME } from "@/constants/theme";
import { AppThemeProvider, useAppTheme } from "@/context/app-theme-provider";
import { AuthProvider, useLoading } from "@/context/auth-provider";
import { QueryProvider } from "@/context/query-provider";
import { useAppInit } from "@/hooks/use-app-init";
import { useNotificationHandler } from "@/hooks/use-notifiation-handler";
import { useUser } from "@/hooks/use-user";
import { Toaster } from "burnt/web";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { ThemeProvider } from "expo-router/react-navigation";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

SplashScreen.preventAutoHideAsync();

// Must be set at module scope, not inside a component,
// so it applies before any notification arrives.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  useNotificationHandler();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <AppThemeProvider>
            <AuthProvider>
              <QueryProvider>
                <StackLayout />
              </QueryProvider>
            </AuthProvider>
          </AppThemeProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
function StackLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { currentTheme, isDark } = useAppTheme();
  const { user } = useUser();
  const { loading } = useLoading();
  const { initApp } = useAppInit();

  // useNetworkStatus();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    initApp();
  }, []);

  if (loading)
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size={50} />
      </View>
    );

  if (!loaded || error) return null;

  return (
    <ThemeProvider value={NAV_THEME[currentTheme || "light"]}>
      <Toaster
        position="top-center"
        richColors
        theme={currentTheme ?? "light"}
      />
      <View className="flex-1 bg-background">
        <StatusBar
          style={isDark ? "light" : "dark"}
          animated
          key={`root-status-bar-${isDark ? "light" : "dark"}`}
        />
        <Stack screenOptions={{}}>
          <Stack.Protected
            guard={!!user && user.profileDetails.shopAssistantPasswordExpired}
          >
            <Stack.Screen
              name="(password-expired)"
              options={{
                headerShown: false,
              }}
            />
          </Stack.Protected>
          <Stack.Protected
            guard={
              !user ||
              (!!user && user.profileDetails.shopAssistantPasswordExpired)
            }
          >
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
              }}
            />
          </Stack.Protected>
          <Stack.Protected
            guard={!!user && !user.profileDetails.shopAssistantPasswordExpired}
          >
            <Stack.Screen
              name="(main)"
              options={{
                headerShown: false,
              }}
            />
          </Stack.Protected>
        </Stack>
      </View>
    </ThemeProvider>
  );
}
