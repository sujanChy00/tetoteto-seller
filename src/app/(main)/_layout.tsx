import { Stack } from "expo-router";

const MainLayout = () => {
  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
      <Stack.Screen name="(tab)" options={{ headerShown: false }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default MainLayout;
