import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { PrimaryButton } from "@/components/ui/button";
import { StickyKeyboardWrapper } from "@/components/ui/sticky-keyboard-wrapper";
import { ThemedText } from "@/components/ui/themed-text";
import { useForm } from "@/hooks/use-form";
import { useHaptics } from "@/hooks/use-haptics";
import { useValidateCode } from "@/mutation/auth-mutation";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, View } from "react-native";

export const OtpForm = () => {
  const haptics = useHaptics();
  const { mutateAsync, isPending } = useValidateCode();

  const { email } = useLocalSearchParams<{ email?: string }>();
  const Form = useForm({
    defaultValues: {
      email,
      reset_code: "",
    },
    onSubmitInvalid: () => {
      haptics("error");
    },
    onSubmit: async ({ value }) => {
      await mutateAsync({
        email: value.email!,
        reset_code: Number(value.reset_code),
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
          <View className="items-center gap-y-6">
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
              name="reset_code"
              validators={{
                onSubmit: ({ value }) => {
                  if (!value?.trim()) {
                    return { message: "OTP is required" };
                  }
                },
              }}
              children={(Field) => <Field.OTPField label="OTP" />}
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
          <PrimaryButton.Label>Send Reset Link</PrimaryButton.Label>
        </Form.SubmitButton>
      </StickyKeyboardWrapper>
    </Form.AppForm>
  );
};
