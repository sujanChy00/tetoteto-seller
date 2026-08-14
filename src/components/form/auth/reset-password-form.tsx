import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { Button } from "@/components/ui/button";
import { FormStickySubmitButtonWrapper } from "@/components/ui/form-sticky-submit-button-wrapper";
import { Host } from "@/components/ui/host";
import { ThemedText } from "@/components/ui/themed-text";
import { useForm } from "@/hooks/use-form";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ResetPasswordForm = () => {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const { token } = useLocalSearchParams<{ token: string }>();
  const Form = useForm({
    defaultValues: { newPassword: "", confirmNewPassword: "" },
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
              Reset Password
            </ThemedText>
            <ThemedText className="text-muted">
              Choose a strong new password, containing at least 8 characters,
              uppercase, lowercase, number, and special character.
            </ThemedText>
          </View>
          <View className="items-center gap-y-6">
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
            <Form.AppField
              name="confirmNewPassword"
              children={(Field) => (
                <Host
                  matchContents={{ vertical: true }}
                  style={{ width: "100%" }}
                >
                  <Field.PasswordField
                    placeholder="********"
                    label="Confirm New Password"
                  />
                </Host>
              )}
            />
          </View>
        </View>
        <AnimatedSpacer height={420} />
      </ScrollView>
      <FormStickySubmitButtonWrapper>
        <Form.SubmitButton>
          {/*<Spinner size={16} />*/}
          <Button.PrimaryLabel>Reset Password</Button.PrimaryLabel>
        </Form.SubmitButton>
      </FormStickySubmitButtonWrapper>
    </Form.AppForm>
  );
};
