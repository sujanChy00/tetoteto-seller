import { PrimaryButton } from "@/components/ui/button";
import { ThemedText } from "@/components/ui/themed-text";
import { useForm } from "@/hooks/use-form";
import { useHaptics } from "@/hooks/use-haptics";
import { useSendResetEmail } from "@/mutation/auth-mutation";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ForgotPasswordForm = () => {
  const haptics = useHaptics();
  const { bottom } = useSafeAreaInsets();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const { mutateAsync, isPending } = useSendResetEmail();
  const Form = useForm({
    defaultValues: { email },
    onSubmitInvalid: () => {
      haptics("error");
    },
    onSubmit: async ({ value }) => {
      await mutateAsync({
        reset_email: value.email!,
      });
    },
  });
  return (
    <Form.AppForm>
      <View className="pt-safe-offset-40 flex-1 px-4 gap-y-14">
        <View className="gap-3">
          <ThemedText className="text-foreground text-3xl font-semibold">
            Forgot Password
          </ThemedText>
          <ThemedText className="text-muted">
            Enter your email address and we'll send you a link to reset your
            password.
          </ThemedText>
        </View>
        <View className="items-center">
          <Form.AppField
            name="email"
            validators={{
              onSubmit: ({ value }) => {
                if (!value?.trim()) {
                  return { message: "Email is required" };
                }
              },
            }}
            children={(Field) => (
              <Field.TextField
                autoFocus
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
        </View>
      </View>
      <KeyboardStickyView
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 16,
        }}
        offset={{
          opened: bottom - 20,
          closed: -16,
        }}
      >
        <Form.SubmitButton>
          {isPending && (
            <ActivityIndicator
              size={"small"}
              colorClassName="accent-primary-foreground"
            />
          )}
          <PrimaryButton.Label>Send Reset Link</PrimaryButton.Label>
        </Form.SubmitButton>
      </KeyboardStickyView>
    </Form.AppForm>
  );
};
