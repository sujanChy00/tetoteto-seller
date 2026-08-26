import { useForm } from "@/hooks/use-form";
import { View } from "react-native";

import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { PrimaryButton } from "@/components/ui/button";
import { StickyKeyboardWrapper } from "@/components/ui/sticky-keyboard-wrapper";
import { ThemedText } from "@/components/ui/themed-text";
import { useHaptics } from "@/hooks/use-haptics";
import { useResetPassword } from "@/mutation/auth-mutation";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView } from "react-native";

export const UpdatePasswordForm = () => {
  const haptics = useHaptics();
  const params = useLocalSearchParams<{ email: string; otp: string }>();
  const { mutateAsync, isPending } = useResetPassword();
  const Form = useForm({
    defaultValues: {
      newPassword: "",
      email: params?.email || "",
      confirmNewPassword: "",
    },
    onSubmitInvalid: () => {
      haptics("error");
    },
    onSubmit: async ({ value }) => {
      await mutateAsync({
        code: params.otp!,
        newPassword: value.newPassword,
        email: value.email,
      });
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
              Update Password
            </ThemedText>
            <ThemedText className="text-muted">
              Choose a strong new password, containing at least 8 characters,
              uppercase, lowercase, number, and special character.
            </ThemedText>
          </View>
          <View className="items-center gap-y-6">
            <Form.AppField
              name="email"
              validators={{
                onSubmit: ({ value }) => {
                  if (!value.trim()) {
                    return { message: "Email is required" };
                  }
                },
              }}
              children={(Field) => (
                <Field.TextField
                  keyboardType="email-address"
                  inputMode="email"
                  label="Email"
                  placeholder="tetoteto@gmail.com"
                  textContentType="emailAddress"
                  spellCheck={false}
                  autoComplete="email"
                />
              )}
            />
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
                  label="New Password"
                  placeholder="********"
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
                  label="Confirm Password"
                  placeholder="********"
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
          <PrimaryButton.Label>Update Password</PrimaryButton.Label>
        </Form.SubmitButton>
      </StickyKeyboardWrapper>
    </Form.AppForm>
  );
};
