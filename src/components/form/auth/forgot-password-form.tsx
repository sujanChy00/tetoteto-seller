import { Button } from "@/components/ui/button";
import { ThemedText } from "@/components/ui/themed-text";
import { useForm } from "@/hooks/use-form";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const Form = useForm({
    defaultValues: { email },
    onSubmit: async ({ value }) => {
      console.log(value);
      router.push({
        pathname: "/auth/otp",
        params: { email: value.email },
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
            children={(Field) => (
              <Field.TextField
                autoFocus
                placeholder="tetoteto@gmail.com"
                label="Email"
                keyboardType="email"
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
          {/*{isPending && <Spinner size={16} />}*/}
          <Button.PrimaryLabel>Send Reset Link</Button.PrimaryLabel>
        </Form.SubmitButton>
      </KeyboardStickyView>
    </Form.AppForm>
  );
};
