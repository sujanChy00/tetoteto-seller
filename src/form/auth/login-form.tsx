import {
  GhostButton,
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui/button";
import { FullScreenSpinner } from "@/components/ui/full-screen-spinner";
import { StyledSymbolView } from "@/components/ui/symbol-view";
import { TextSeparator } from "@/components/ui/text-separator";
import { ThemedText } from "@/components/ui/themed-text";
import { isIOS, isNative } from "@/constants/platform";
import { LoginFormData, LoginSchema } from "@/form/auth/auth-schema";
import { useDeviceToken } from "@/hooks/use-device-token";
import { useForm } from "@/hooks/use-form";
import { useHaptics } from "@/hooks/use-haptics";
import {
  useBiometricLoginMutation,
  useLoginMutation,
} from "@/mutation/auth-mutation";
import { useCheckForBiometrics } from "@/queries/auth-query";
import { useSelector } from "@tanstack/react-form";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

export const LoginForm = () => {
  const router = useRouter();
  const { deviceToken } = useDeviceToken();
  const hapticFeedBack = useHaptics();

  const { mutate: login, isPending } = useLoginMutation();
  const { data: biometrics } = useCheckForBiometrics();
  const { mutate: loginWithBiometrics, isPending: isAuthenticating } =
    useBiometricLoginMutation();

  const Form = useForm({
    defaultValues: { email: "", password: "" } as LoginFormData,
    validators: { onSubmit: LoginSchema },
    onSubmit: ({ value }) => {
      login({
        ...value,
        deviceToken,
      });
    },
    onSubmitInvalid: () => {
      hapticFeedBack("error");
    },
  });

  const email = useSelector(Form.store, (state) => state.values.email);
  const showBiometricLogin =
    isNative &&
    !!biometrics?.hasHardware &&
    !!biometrics?.isEnrolled &&
    !!biometrics?.isBiometricLoginEnabled;

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
        contentContainerClassName="pt-safe pb-safe-offset-10"
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
                    onSubmitEditing={() => {
                      Form.handleSubmit();
                    }}
                    returnKeyType="done"
                    label="Password"
                    placeholder="********"
                  />
                )}
              />
              <View className="w-full gap-y-3">
                <View className="gap-y-1">
                  <Form.SubmitButton className="flex-1">
                    <PrimaryButton.Label>Login</PrimaryButton.Label>
                  </Form.SubmitButton>

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
                    <GhostButton.Label className="text-foreground">
                      Forgot Password?
                    </GhostButton.Label>
                  </GhostButton>
                </View>
                {showBiometricLogin && (
                  <View className="gap-y-3">
                    <TextSeparator text="OR" />
                    <SecondaryButton
                      onPress={() => loginWithBiometrics()}
                      disabled={isAuthenticating}
                    >
                      <GhostButton.Label>
                        {isIOS ? "Login with FaceID" : "Login with Fingerprint"}
                      </GhostButton.Label>
                      <StyledSymbolView
                        tintColorClassName={"accent-primary"}
                        name={{
                          ios: "faceid",
                          android: "fingerprint",
                        }}
                      />
                    </SecondaryButton>
                  </View>
                )}
              </View>
            </View>
          </Form.AppForm>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
