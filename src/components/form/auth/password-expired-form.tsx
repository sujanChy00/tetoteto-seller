import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { Button } from "@/components/ui/button";
import { Host } from "@/components/ui/host";
import { StickyButtonWrapper } from "@/components/ui/sticky-button-wrapper";
import { ThemedText } from "@/components/ui/themed-text";
import { useAppTheme } from "@/context/app-theme-provider";
import { useForm } from "@/hooks/use-form";
import { useUser } from "@/hooks/use-user";
import { useLogoutMutation } from "@/mutation/auth-mutation";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const PasswordExpiredForm = () => {
  const { currentTheme } = useAppTheme();
  const { user } = useUser();
  const { bottom } = useSafeAreaInsets();
  const { mutate: logout, isPending } = useLogoutMutation();
  const Form = useForm({
    defaultValues: { oldPassword: "", newPassword: "" },
    onSubmit: async ({ value }) => {
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
                <Host
                  matchContents={{ vertical: true }}
                  style={{ width: "100%" }}
                >
                  <Field.PasswordField
                    placeholder="********"
                    label="Old Password"
                  />
                </Host>
              )}
            />
            <Form.AppField
              name="newPassword"
              children={(Field) => (
                <Field.PasswordField
                  placeholder="********"
                  label="New Password"
                />
              )}
            />
          </View>
        </View>
        <AnimatedSpacer height={450} />
      </ScrollView>
      <StickyButtonWrapper>
        <View className="gap-y-3 bg-background w-full">
          <Form.SubmitButton>
            {/*<Spinner size={16} />*/}
            <Button.PrimaryLabel>Reset Password</Button.PrimaryLabel>
          </Form.SubmitButton>
          <Button.Ghost
            onPress={() => {
              logout();
            }}
          >
            {/*{isPending && <Spinner size={20} />}*/}
            <Button.DangerSoftLabel>
              Login with another account?
            </Button.DangerSoftLabel>
          </Button.Ghost>
        </View>
      </StickyButtonWrapper>
    </Form.AppForm>
  );
};
