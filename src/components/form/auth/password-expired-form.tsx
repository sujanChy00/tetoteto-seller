import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { Button } from "@/components/ui/button";
import { UISpinner } from "@/components/ui/spinner";
import { ThemedText } from "@/components/ui/themed-text";
import { useAppTheme } from "@/context/app-theme-provider";
import { useForm } from "@/hooks/use-form";
import { useUser } from "@/hooks/use-user";
import { useLogoutMutation } from "@/mutation/auth-mutation";
import { Host, Row, Text } from "@expo/ui";
import { ScrollView, View } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const PasswordExpiredForm = () => {
  const { currentTheme } = useAppTheme();
  const { user } = useUser();
  const { bottom } = useSafeAreaInsets();
  const { mutate: logout, isPending } = useLogoutMutation();
  const Form = useForm({
    defaultValues: { oldPassword: "", newPassword: "" },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return (
    <Form.AppForm>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="pt-safe-offset-40 flex-1 px-4 gap-y-10">
          <View className="gap-3">
            <ThemedText className="text-foreground text-3xl font-semibold">
              Password Expired
            </ThemedText>
            <ThemedText className="text-muted">
              Your password for email{" "}
              <ThemedText className="text-danger">
                {user?.profileDetails.shopAssistantEmail}
              </ThemedText>{" "}
              has expired.
            </ThemedText>
          </View>
          <View className="items-center gap-y-6">
            <Form.AppField
              name="oldPassword"
              children={(Field) => (
                <Field.PasswordField
                  placeholder="********"
                  label="Old Password"
                  useFullWidth
                  paddingHorizontal={16}
                />
              )}
            />
            <Form.AppField
              name="newPassword"
              children={(Field) => (
                <Field.PasswordField
                  placeholder="********"
                  label="New Password"
                  useFullWidth
                  paddingHorizontal={16}
                />
              )}
            />
          </View>
        </View>
        <AnimatedSpacer height={450} />
      </ScrollView>
      <KeyboardStickyView
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        offset={{
          opened: bottom - 20,
          closed: -16,
        }}
      >
        <View className="items-center gap-y-3 bg-background">
          <Form.SubmitButton
            buttonText="Reset Password"
            useFullWidth
            paddingHorizontal={16}
          />
          <Host matchContents>
            <Button
              onPress={logout}
              variant="text"
              useFullWidth
              paddingHorizontal={16}
            >
              <Row spacing={10} alignment="center">
                {isPending && <UISpinner size={20} />}
                <Text>Login with another account?</Text>
              </Row>
            </Button>
          </Host>
        </View>
      </KeyboardStickyView>
    </Form.AppForm>
  );
};
