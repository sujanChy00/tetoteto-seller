import { ThemedText } from "@/components/ui/themed-text";
import { useForm } from "@/hooks/use-form";
import { Host } from "@expo/ui";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const OtpForm = () => {
  const { bottom } = useSafeAreaInsets();
  const { email } = useLocalSearchParams<{ email?: string }>();

  const Form = useForm({
    defaultValues: {
      email,
      reset_code: "",
    },
  });

  return (
    <Form.AppForm>
      <View className="pt-safe-offset-40 flex-1 px-4 gap-y-14">
        <View className="gap-3">
          <ThemedText className="text-foreground text-3xl font-semibold">
            Enter OTP
          </ThemedText>
          <View>
            <ThemedText className="text-muted">
              A 6-digit code has been sent to your email address.
            </ThemedText>
            <ThemedText className="text-muted">
              Please enter the code below.
            </ThemedText>
          </View>
        </View>
        <View className="items-center gap-y-10">
          <Form.AppField
            name="email"
            children={(Field) => (
              <Host matchContents useViewportSizeMeasurement>
                <Field.TextField
                  placeholder="tetoteto@gmail.com"
                  label="Email"
                  keyboardType="email"
                />
              </Host>
            )}
          />
          <Form.AppField
            name="reset_code"
            children={(Field) => <Field.OTPField label="OTP" />}
          />
        </View>
      </View>
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
        <Host matchContents useViewportSizeMeasurement>
          <Form.SubmitButton buttonText="Send Reset Link" />
        </Host>
      </KeyboardStickyView>
    </Form.AppForm>
  );
};
