import { useForm } from "@/hooks/use-form";
import { useSelector } from "@tanstack/react-form";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import { toast } from "../../ui/toast";

import { Host } from "@expo/ui";
import { useRouter } from "expo-router";
import {
  Keyboard,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { Button } from "../../ui/button";
import { ThemedText } from "../../ui/themed-text";
import { UIText } from "../../ui/ui-text";

export const LoginForm = () => {
  const router = useRouter();
  const Form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      toast.success("Logged in successfully");
      console.log(value);
    },
  });

  const email = useSelector(Form.store, (state) => state.values.email);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        className="py-safe bg-background"
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                <Text className="text-muted text-center">
                  Please sign in to continue.
                </Text>
              </View>
            </View>
            <Form.AppForm>
              <View className="px-4 gap-6 items-center pt-8">
                <Form.AppField
                  name="email"
                  children={(field) => (
                    <Host matchContents useViewportSizeMeasurement>
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
                    <field.PasswordField
                      placeholder="password"
                      label="Password"
                    />
                  )}
                />
                <View>
                  <Host matchContents useViewportSizeMeasurement>
                    <Form.SubmitButton buttonText="Login" />
                  </Host>
                  <Host matchContents useViewportSizeMeasurement>
                    <Button
                      onPress={() => {
                        router.push({
                          pathname: "/auth/forgot-password",
                          params: {
                            email,
                          },
                        });
                      }}
                      label="Theme"
                      variant="text"
                    >
                      <UIText>Forgot Password?</UIText>
                    </Button>
                  </Host>
                </View>
              </View>
            </Form.AppForm>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
