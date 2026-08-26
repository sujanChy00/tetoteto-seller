import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { PrimaryButton } from "@/components/ui/button";
import { StickyKeyboardWrapper } from "@/components/ui/sticky-keyboard-wrapper";
import { ThemedText } from "@/components/ui/themed-text";
import { useForm } from "@/hooks/use-form";
import { useHaptics } from "@/hooks/use-haptics";
import { useUpdatePassword } from "@/mutation/auth-mutation";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, View } from "react-native";

export const ResetPasswordForm = () => {
  const haptics = useHaptics();
  const { mutateAsync, isPending } = useUpdatePassword();
  const { token } = useLocalSearchParams<{ token: string }>();
  const Form = useForm({
    defaultValues: { newPassword: "", confirmNewPassword: "" },
    onSubmit: async ({ value }) => {
      await mutateAsync({
        newPassword: value.newPassword,
        oldPassword: null,
        token,
      });
    },
    onSubmitInvalid: () => {
      haptics("error");
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
              validators={{
                onSubmit: ({ value }) => {
                  if (!value.trim()) {
                    return { message: "Password is required" };
                  }
                },
              }}
              children={(Field) => (
                <Field.PasswordField
                  placeholder="********"
                  label="New Password"
                  textContentType={"newPassword"}
                  autoComplete={"new-password"}
                />
              )}
            />
            <Form.AppField
              name="confirmNewPassword"
              validators={{
                onSubmit: ({ fieldApi, value }) => {
                  const password = fieldApi.form.getFieldValue("newPassword");

                  if (value !== password) {
                    return { message: "Passwords don't match" };
                  }
                },
              }}
              children={(Field) => (
                <Field.PasswordField
                  placeholder="********"
                  label="Confirm New Password"
                  textContentType={"newPassword"}
                  autoComplete={"new-password"}
                />
              )}
            />
          </View>
        </View>
        <AnimatedSpacer height={420} />
      </ScrollView>
      <StickyKeyboardWrapper>
        <Form.SubmitButton>
          {isPending && (
            <ActivityIndicator
              size={"small"}
              colorClassName="accent-primary-foreground"
            />
          )}
          <PrimaryButton.Label>Reset Password</PrimaryButton.Label>
        </Form.SubmitButton>
      </StickyKeyboardWrapper>
    </Form.AppForm>
  );
};
