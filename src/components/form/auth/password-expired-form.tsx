import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { GhostButton, PrimaryButton } from "@/components/ui/button";
import { StickyButtonWrapper } from "@/components/ui/sticky-button-wrapper";
import { ThemedText } from "@/components/ui/themed-text";
import { useForm } from "@/hooks/use-form";
import { useScrollToBottomOnKeyboardVisible } from "@/hooks/use-scroll-to-bottom-on-keyboard-visible";
import { useUser } from "@/hooks/use-user";
import { useLogoutMutation } from "@/mutation/auth-mutation";
import { ActivityIndicator, ScrollView, View } from "react-native";

export const PasswordExpiredForm = () => {
  const { scrollViewRef } = useScrollToBottomOnKeyboardVisible();
  const { user } = useUser();
  const { mutate: logout, isPending: isPendingLogout } = useLogoutMutation();
  const Form = useForm({
    defaultValues: { oldPassword: "", newPassword: "" },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return (
    <Form.AppForm>
      <ScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="pt-safe-offset-40 flex-1 px-4 gap-y-10">
          <View className="gap-3">
            <ThemedText className="text-3xl font-semibold">
              Password Expired
            </ThemedText>
            <ThemedText className="text-muted">
              Your password for email{" "}
              <ThemedText className="text-danger">
                {user?.profileDetails.shopAssistantEmail}
              </ThemedText>{" "}
              has expired.
            </ThemedText>
          </View>
          <View className="items-center gap-y-6">
            <Form.AppField
              name="oldPassword"
              children={(Field) => (
                <Field.PasswordField
                  placeholder="********"
                  label="Old Password"
                />
              )}
            />
            <Form.AppField
              name="newPassword"
              children={(Field) => (
                <Field.PasswordField
                  placeholder="********"
                  label="New Password"
                  textContentType={"newPassword"}
                  autoComplete={"new-password"}
                />
              )}
            />
          </View>
        </View>
        <AnimatedSpacer height={500} />
      </ScrollView>
      <StickyButtonWrapper closedOffset={-22}>
        <View className="gap-y-1 w-full">
          <Form.SubmitButton>
            {/*<ActivityIndicator size={16} />*/}
            <PrimaryButton.Label>Reset Password</PrimaryButton.Label>
          </Form.SubmitButton>
          <GhostButton
            onPress={() => {
              logout();
            }}
          >
            {isPendingLogout && <ActivityIndicator size={20} />}
            <GhostButton.Label>Login with another account?</GhostButton.Label>
          </GhostButton>
        </View>
      </StickyButtonWrapper>
    </Form.AppForm>
  );
};
