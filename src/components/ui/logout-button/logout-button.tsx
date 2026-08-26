import { useLogoutMutation } from "@/mutation/auth-mutation";
import { Alert } from "react-native";
import { DangerButton } from "../button";
import { StyledSymbolView } from "../symbol-view";

export const LogoutButton = () => {
  const { mutate: logout, isPending } = useLogoutMutation();

  const onLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          logout();
        },
      },
    ]);
  };

  return (
    <DangerButton onPress={onLogout}>
      <DangerButton.Label>Logout</DangerButton.Label>
      <StyledSymbolView
        name={{
          android: "logout",
          ios: "rectangle.portrait.and.arrow.right",
        }}
        size={16}
        tintColorClassName={"accent-danger-foreground"}
      />
    </DangerButton>
  );
};
