import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { Button } from "@/components/ui/button";
import { StickyButtonWrapper } from "@/components/ui/sticky-button-wrapper";
import { ThemedText } from "@/components/ui/themed-text";
import { useForm } from "@/hooks/use-form";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const OtpForm = () => {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  const { email } = useLocalSearchParams<{ email?: string }>();
  const Form = useForm({
    defaultValues: {
      email,
      reset_code: "",
    },
    onSubmit: ({ value }) => {
      router.push({
        pathname: "/auth/update-password",
        params: {
          email: value.email,
        },
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
              children={(Field) => (
                <Field.TextField
                  placeholder="tetoteto@gmail.com"
                  label="Email"
                  keyboardType="email"
                />
              )}
            />
            <Form.AppField
              name="reset_code"
              children={(Field) => <Field.OTPField label="OTP" />}
            />
          </View>
        </View>
        <AnimatedSpacer height={420} />
      </ScrollView>
      <StickyButtonWrapper>
        <Form.SubmitButton>
          {/*<Spinner size={16} />*/}
          <Button.PrimaryLabel>Send Reset Link</Button.PrimaryLabel>
        </Form.SubmitButton>
      </StickyButtonWrapper>
    </Form.AppForm>
  );
};
