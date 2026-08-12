import { isAndroid } from "@/constants/platform";
import { useLogoutMutation } from "@/mutation/auth-mutation";
import { Icon, Spacer, Text } from "@expo/ui";
import { useCSSVariable } from "uniwind";
import { AlertDialog } from "../alert-dialog";
import { Button } from "../button";
import { Host } from "../host";
import { Row } from "../row";

const LOGOUT_ICON = Icon.select({
  android: import("@expo/material-symbols/logout.xml"),
  ios: "rectangle.portrait.and.arrow.right",
});

export const LogoutButton = () => {
  const { mutate: logout, isPending } = useLogoutMutation();
  const dangerColor = useCSSVariable("--color-danger");
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
          <Button
            backgroundColor={dangerColor as string}
            onPress={open}
            height={50}
            roleIos="destructive"
            variant="filled"
          >
            <Row alignment="center">
              <Text
                textStyle={{
                  color: isAndroid ? "#fff" : undefined,
                }}
              >
                Logout
              </Text>
              <Spacer size={6} />
              <Icon
                name={LOGOUT_ICON}
                size={16}
                color={isAndroid ? "#fff" : undefined}
              />
            </Row>
          </Button>
        )}
      />
    </Host>
  );
};
