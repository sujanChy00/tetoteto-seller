import { Stack } from "expo-router";

const PasswordExpiredLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackButtonDisplayMode: "minimal",
      }}
    />
  );
};

export default PasswordExpiredLayout;
