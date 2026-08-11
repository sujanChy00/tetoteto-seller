import { useForm } from "@/hooks/use-form";
import { useSelector } from "@tanstack/react-form";
import { Image } from "expo-image";
import { View } from "react-native";

import { FullScreenSpinner } from "@/components/ui/full-screen-spinner";
import { Host } from "@/components/ui/host";
import { isIOS } from "@/constants/platform";
import { useHaptics } from "@/hooks/use-haptics";
import { useLoginMutation } from "@/mutation/auth-mutation";
import { LoginFormData, LoginSchema } from "@/schema/auth-schema";
import { Text } from "@expo/ui";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { Button } from "../../ui/button";
import { ThemedText } from "../../ui/themed-text";

export const LoginForm = () => {
  const router = useRouter();
  const hapticFeedBack = useHaptics();

  const { mutate: login, isPending } = useLoginMutation();

  const Form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as LoginFormData,
    validators: {
      onSubmit: LoginSchema,
    },
    onSubmit: ({ value, meta }) => {
      login(value);
    },
    onSubmitInvalid: () => {
      hapticFeedBack("error");
    },
  });

  const email = useSelector(Form.store, (state) => state.values.email);
  return (
    <KeyboardAvoidingView
      behavior={isIOS ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <FullScreenSpinner isVisible={isPending} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        className="py-safe bg-background"
        style={{ flex: 1 }}
      >
        <View className="flex-1 pt-28">
          <View className="items-center gap-y-3">
            <Image
              source={require("@/assets/images/logo.png")}
              style={{ width: 120, height: 120 }}
              contentFit="contain"
            />
            <View className="gap-0.5">
              <ThemedText className="text-foreground text-2xl font-semibold text-center">
                Welcome Back!
              </ThemedText>
              <ThemedText className="text-muted text-center">
                Please sign in to continue.
              </ThemedText>
            </View>
          </View>
          <Form.AppForm>
            <View className="px-4 gap-6 items-center pt-8">
              <Form.AppField
                name="email"
                children={(field) => (
                  <Host
                    matchContents={{ vertical: true }}
                    style={{ width: "100%" }}
                  >
                    <field.TextField
                      keyboardType="email"
                      placeholder="email"
                      label="Email"
                    />
                  </Host>
                )}
              />
              <Form.AppField
                name="password"
                children={(field) => (
                  <Host
                    matchContents={{ vertical: true }}
                    style={{ width: "100%" }}
                  >
                    <field.PasswordField
                      placeholder="password"
                      label="Password"
                    />
                  </Host>
                )}
              />
              <View className="w-full">
                <Form.SubmitButton buttonText="Login" />
                <Host
                  matchContents={{ vertical: true }}
                  style={{ width: "100%" }}
                >
                  <Button
                    onPress={() => {
                      router.push({
                        pathname: "/auth/forgot-password",
                        params: {
                          email,
                        },
                      });
                    }}
                    variant="text"
                  >
                    <Text>Forgot Password?</Text>
                  </Button>
                </Host>
              </View>
            </View>
          </Form.AppForm>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
