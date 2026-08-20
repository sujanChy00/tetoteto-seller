import { useLogoutMutation } from "@/mutation/auth-mutation";
import { RNHostView } from "@expo/ui";
import { AlertDialog } from "../alert-dialog";
import { DangerButton } from "../button";
import { Host } from "../host";
import { StyledSymbolView } from "../symbol-view";

export const LogoutButton = () => {
  const { mutate: logout, isPending } = useLogoutMutation();

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
              <StyledSymbolView
                name={{
                  android: "logout",
                  ios: "rectangle.portrait.and.arrow.right",
                }}
                size={16}
                tintColorClassName={"accent-danger-foreground"}
              />
            </DangerButton>
          </RNHostView>
        )}
      />
    </Host>
  );
};
