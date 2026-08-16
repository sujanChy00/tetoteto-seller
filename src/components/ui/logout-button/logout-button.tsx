import { useLogoutMutation } from "@/mutation/auth-mutation";
import { Icon, RNHostView } from "@expo/ui";
import { SymbolView } from "expo-symbols";
import { useCSSVariable } from "uniwind";
import { AlertDialog } from "../alert-dialog";
import { DangerButton } from "../button";
import { Host } from "../host";

const LOGOUT_ICON = Icon.select({
  android: import("@expo/material-symbols/logout.xml"),
  ios: "rectangle.portrait.and.arrow.right",
});

export const LogoutButton = () => {
  const { mutate: logout, isPending } = useLogoutMutation();
  const dangerForegroundColor = useCSSVariable(
    "--color-danger-foreground",
  ) as string;
  return (
    <Host matchContents={{ vertical: true }}>
      <AlertDialog
        title="Logout"
        message="Are you sure you want to logout?"
        onConfirm={logout}
        confirmButtonRole="destructive"
        isConfirming={isPending}
        confirmButtonText="logout"
        trigger={(open) => (
          <RNHostView matchContents>
            <DangerButton onPress={open}>
              <DangerButton.Label>Logout</DangerButton.Label>
              <SymbolView
                name={{
                  android: "logout",
                  ios: "rectangle.portrait.and.arrow.right",
                }}
                size={16}
                tintColor={dangerForegroundColor}
              />
            </DangerButton>
          </RNHostView>
        )}
      />
    </Host>
  );
};
