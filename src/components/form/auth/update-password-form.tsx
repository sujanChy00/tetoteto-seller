import { useForm } from "@/hooks/use-form";
import { View } from "react-native";
import { toast } from "../../../utils/toast";

import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
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
      toast.success("Logged in successfully");
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
                  placeholder="tetoteto@gmail.com"
                  label="Email"
                  keyboardType="email"
                  useFullWidth
                  paddingHorizontal={16}
                />
              )}
            />
            <Form.AppField
              name="newPassword"
              children={(Field) => (
                <Field.PasswordField
                  useFullWidth
                  paddingHorizontal={16}
                  label="New Password"
                  placeholder="********"
                />
              )}
            />
            <Form.AppField
              name="confirmNewPassword"
              children={(Field) => (
                <Field.PasswordField
                  useFullWidth
                  paddingHorizontal={16}
                  label="Confirm Password"
                  placeholder="********"
                />
              )}
            />
          </View>
        </View>
        <AnimatedSpacer height={420} />
      </ScrollView>
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
        <Form.SubmitButton
          buttonText="Send Reset Link"
          useFullWidth
          paddingHorizontal={16}
        />
      </KeyboardStickyView>
    </Form.AppForm>
  );
};
