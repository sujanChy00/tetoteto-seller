import { PrimaryButton } from "@/components/ui/button";
import { FullScreenSpinner } from "@/components/ui/full-screen-spinner";
import { ThemedText } from "@/components/ui/themed-text";
import { ResetPasswordForm } from "@/form/auth/reset-password-form";
import { useValidateLinkMutation } from "@/mutation/auth-mutation";
import { Link, Redirect, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

const ResetPasswordScreen = () => {
  const { token } = useLocalSearchParams<{ token: string }>();
  const {
    mutateAsync: validateToken,
    isPending: validatingLink,
    isError: invalidToken,
    error: tokenError,
  } = useValidateLinkMutation();

  useEffect(() => {
    if (!token) return;
    validateToken(token);
  }, [token]);

  if (!token) return <Redirect href="/(auth)" />;

  if (validatingLink)
    return <FullScreenSpinner isVisible loadingText="Validating Token" />;
  if (invalidToken && tokenError)
    return (
      <View className="flex-1 items-center justify-center gap-y-3">
        <ThemedText className="text-danger text-base font-semibold">
          Invalid Verification Code
        </ThemedText>
        <Link
          asChild
          href={{
            pathname: "/(auth)",
          }}
        >
          <PrimaryButton>
            <PrimaryButton.Label>Back to Login</PrimaryButton.Label>
          </PrimaryButton>
        </Link>
      </View>
    );
  return <ResetPasswordForm />;
};

export default ResetPasswordScreen;
