import { FullScreenSpinner } from "@/components/ui/full-screen-spinner";
import { BIOMETRIC_EMAIL_KEY, BIOMETRIC_PASSWORD_KEY } from "@/constants/data";
import { isIOS, isNative, isWeb } from "@/constants/platform";
import { useForm } from "@/hooks/use-form";
import { useHaptics } from "@/hooks/use-haptics";
import { useLoginMutation } from "@/mutation/auth-mutation";
import { LoginFormData, LoginSchema } from "@/schema/auth-schema";
import { toast } from "@/utils/toast";
import { useSelector } from "@tanstack/react-form";
import { Image } from "expo-image";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useCSSVariable } from "uniwind";
import { GhostButton, PrimaryButton, SecondaryButton } from "../../ui/button";
import { ThemedText } from "../../ui/themed-text";

export const LoginForm = () => {
  const [colorPrimary] = useCSSVariable(["--color-primary"]);
  const router = useRouter();
  const hapticFeedBack = useHaptics();

  const { mutate: login, isPending } = useLoginMutation();

  const [hasBiometricsHardware, setHasBiometricsHardware] = useState(false);
  const [isBiometricsEnrolled, setIsBiometricsEnrolled] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isBiometricLoginEnabled, setIsBiometricLoginEnabled] = useState(false);

  useEffect(() => {
    checkBiometrics();
  }, []);

  const checkBiometrics = async () => {
    if (isWeb) return;
    const compatible = await LocalAuthentication.hasHardwareAsync();
    setHasBiometricsHardware(compatible);
    if (compatible) {
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setIsBiometricsEnrolled(enrolled);
      const storedEmail = await SecureStore.getItemAsync(BIOMETRIC_EMAIL_KEY);
      if (enrolled && storedEmail) {
        setIsBiometricLoginEnabled(true);
      }
    }
  };

  const storeBiometricCredentials = async (
    email: string,
    password_1: string,
  ) => {
    await SecureStore.setItemAsync(BIOMETRIC_EMAIL_KEY, email);
    await SecureStore.setItemAsync(BIOMETRIC_PASSWORD_KEY, password_1);
    setIsBiometricLoginEnabled(true);
  };

  const handleBiometricLogin = async () => {
    try {
      const storedEmail = await SecureStore.getItemAsync(BIOMETRIC_EMAIL_KEY);
      const storedPassword = await SecureStore.getItemAsync(
        BIOMETRIC_PASSWORD_KEY,
      );

      if (!storedEmail || !storedPassword) {
        hapticFeedBack("error");
        toast.error(
          "Biometric login isn't set up. Please log in manually first.",
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: isIOS ? "Login with Face ID" : "Login with Fingerprint",
        cancelLabel: "Cancel",
        disableDeviceFallback: true,
      });

      if (result.success) {
        setIsAuthenticating(true);
        login({ email: storedEmail, password: storedPassword });
        return;
      }

      hapticFeedBack("error");
      switch (result.error) {
        case "user_cancel":
        case "app_cancel":
        case "system_cancel":
          break;
        case "lockout":
          toast.error(
            "Too many attempts. Biometrics locked — use your passcode or password.",
          );
          break;
        case "not_enrolled":
          toast.error("No biometrics found on this device.");
          setIsBiometricLoginEnabled(false);
          break;
        case "not_available":
          toast.error("Biometric authentication isn't available right now.");
          break;
        default:
          toast.error("Biometric login failed. Please try again.");
      }
    } catch (error) {
      hapticFeedBack("error");
      toast.error("Something went wrong. Please try logging in manually.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const Form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as LoginFormData,
    validators: {
      onSubmit: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      login(value, {
        onSuccess: () => {
          if (isNative) storeBiometricCredentials(value.email, value.password);
        },
      });
    },
    onSubmitInvalid: () => {
      hapticFeedBack("error");
    },
  });

  const email = useSelector(Form.store, (state) => state.values.email);
  const showBiometricLogin =
    hasBiometricsHardware &&
    isBiometricsEnrolled &&
    isBiometricLoginEnabled &&
    isNative;

  return (
    <KeyboardAvoidingView
      behavior={isIOS ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <FullScreenSpinner isVisible={isPending || isAuthenticating} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
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
                  <field.TextField
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
                name="password"
                children={(field) => (
                  <field.PasswordField
                    returnKeyType="done"
                    label="Password"
                    placeholder="********"
                  />
                )}
              />
              <View className="w-full gap-y-3">
                <View className="flex-row gap-3 items-center">
                  <Form.SubmitButton className="flex-1">
                    {isPending && <ActivityIndicator size={16} />}
                    <PrimaryButton.Label>Login</PrimaryButton.Label>
                  </Form.SubmitButton>

                  {showBiometricLogin && (
                    <SecondaryButton
                      onPress={handleBiometricLogin}
                      disabled={isAuthenticating}
                    >
                      <SymbolView
                        tintColor={colorPrimary as string}
                        name={{
                          ios: "faceid",
                          android: "fingerprint",
                        }}
                      />
                    </SecondaryButton>
                  )}
                </View>

                <GhostButton
                  onPress={() => {
                    router.push({
                      pathname: "/auth/forgot-password",
                      params: {
                        email,
                      },
                    });
                  }}
                >
                  <GhostButton.Label>Forgot Password?</GhostButton.Label>
                </GhostButton>
              </View>
            </View>
          </Form.AppForm>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
