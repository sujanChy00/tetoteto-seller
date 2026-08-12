import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { Button } from "@/components/ui/button";
import { FormStickySubmitButtonWrapper } from "@/components/ui/form-sticky-submit-button-wrapper";
import { Host } from "@/components/ui/host";
import { Spinner } from "@/components/ui/spinner";
import { ThemedText } from "@/components/ui/themed-text";
import { useAppTheme } from "@/context/app-theme-provider";
import { useForm } from "@/hooks/use-form";
import { useUser } from "@/hooks/use-user";
import { useLogoutMutation } from "@/mutation/auth-mutation";
import { Row, Text } from "@expo/ui";
import { ScrollView, View } from "react-native";
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
                <Host
                  matchContents={{ vertical: true }}
                  style={{ width: "100%" }}
                >
                  <Field.PasswordField
                    placeholder="********"
                    label="Old Password"
                  />
                </Host>
              )}
            />
            <Form.AppField
              name="newPassword"
              children={(Field) => (
                <Host
                  matchContents={{ vertical: true }}
                  style={{ width: "100%" }}
                >
                  <Field.PasswordField
                    placeholder="********"
                    label="New Password"
                  />
                </Host>
              )}
            />
          </View>
        </View>
        <AnimatedSpacer height={450} />
      </ScrollView>
      <FormStickySubmitButtonWrapper>
        <View className="gap-y-3 bg-background w-full">
          <Form.SubmitButton>
            <Row alignment="center" spacing={6}>
              <Spinner size={16} />
              <Text>Reset Password</Text>
            </Row>
          </Form.SubmitButton>
          <Host matchContents={{ vertical: true }} style={{ width: "100%" }}>
            <Button onPress={logout} variant="text">
              <Row spacing={10} alignment="center">
                {isPending && <Spinner size={20} />}
                <Text>Login with another account?</Text>
              </Row>
            </Button>
          </Host>
        </View>
      </FormStickySubmitButtonWrapper>
    </Form.AppForm>
  );
};
