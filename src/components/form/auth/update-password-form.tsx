import { useForm } from "@/hooks/use-form";
import { View } from "react-native";

import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { PrimaryButton } from "@/components/ui/button";
import { StickyKeyboardWrapper } from "@/components/ui/sticky-keyboard-wrapper";
import { successToast } from "@/utils/toast";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../../ui/themed-text";

export const UpdatePasswordForm = () => {
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ email: string; otp: string }>();
  const Form = useForm({
    defaultValues: {
      newPassword: "",
      email: params?.email || "",
      confirmNewPassword: "",
    },
    onSubmit: ({ value }) => {
      successToast({
        title: "Success",
        description: "Password updated successfully",
      });
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
          {/*<Spinner size={16} />*/}
          <PrimaryButton.Label>Update Password</PrimaryButton.Label>
        </Form.SubmitButton>
      </StickyKeyboardWrapper>
    </Form.AppForm>
  );
};
