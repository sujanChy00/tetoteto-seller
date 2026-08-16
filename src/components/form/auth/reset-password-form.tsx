import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { PrimaryButton } from "@/components/ui/button";
import { StickyButtonWrapper } from "@/components/ui/sticky-button-wrapper";
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
      <StickyButtonWrapper>
        <Form.SubmitButton>
          {/*<Spinner size={16} />*/}
          <PrimaryButton.Label>Reset Password</PrimaryButton.Label>
        </Form.SubmitButton>
      </StickyButtonWrapper>
    </Form.AppForm>
  );
};
