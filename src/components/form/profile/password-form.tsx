import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { PrimaryButton } from "@/components/ui/button";
import { StickyKeyboardWrapper } from "@/components/ui/sticky-keyboard-wrapper";
import { useForm } from "@/hooks/use-form";
import { useHaptics } from "@/hooks/use-haptics";
import { useUpdatePassword } from "@/mutation/auth-mutation";
import { PasswordFormData, PasswordSchema } from "@/schema/auth-schema";
import { ActivityIndicator, ScrollView, View } from "react-native";

export const PasswordForm = () => {
  const hapticFeedBack = useHaptics();
  const { mutateAsync, isPending } = useUpdatePassword();
  const Form = useForm({
    defaultValues: {} as PasswordFormData,
    validators: {
      onSubmit: PasswordSchema,
    },
    onSubmitInvalid: () => {
      hapticFeedBack("error");
    },
    onSubmit: async ({ value }) => {
      await mutateAsync({
        oldPassword: value.oldPassword,
        newPassword: value.newPassword,
      });
    },
  });
  return (
    <Form.AppForm>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        contentContainerClassName="pt-20 px-4"
      >
        <View className="gap-y-6">
          <Form.AppField
            name="oldPassword"
            children={(Field) => (
              <Field.PasswordField
                label="Old Password"
                textContentType={"password"}
                autoComplete={"current-password"}
                placeholder="*******"
              />
            )}
          />
          <Form.AppField
            name="newPassword"
            children={(Field) => (
              <Field.PasswordField
                label="New Password"
                textContentType={"newPassword"}
                autoComplete={"new-password"}
                placeholder="*******"
              />
            )}
          />
          <Form.AppField
            name="confirmPassword"
            children={(Field) => (
              <Field.PasswordField
                label="Confirm Password"
                textContentType={"newPassword"}
                autoComplete={"new-password"}
                placeholder="*******"
              />
            )}
          />
        </View>
        <AnimatedSpacer height={450} />
      </ScrollView>
      <StickyKeyboardWrapper>
        <Form.SubmitButton disabled={isPending}>
          {isPending && <ActivityIndicator size={16} />}
          <PrimaryButton.Label>Update Password</PrimaryButton.Label>
        </Form.SubmitButton>
      </StickyKeyboardWrapper>
    </Form.AppForm>
  );
};
