import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { Button } from "@/components/ui/button";
import { FormStickySubmitButtonWrapper } from "@/components/ui/form-sticky-submit-button-wrapper";
import { Host } from "@/components/ui/host";
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
        contentContainerClassName="pt-20 px-2"
      >
        <View className="gap-y-6">
          <Form.AppField
            name="oldPassword"
            children={(Field) => (
              <Host matchContents={{ vertical: true }}>
                <Field.PasswordField label="Old Password" />
              </Host>
            )}
          />
          <Form.AppField
            name="newPassword"
            children={(Field) => (
              <Host matchContents={{ vertical: true }}>
                <Field.PasswordField label="New Password" />
              </Host>
            )}
          />
          <Form.AppField
            name="confirmPassword"
            children={(Field) => (
              <Host matchContents={{ vertical: true }}>
                <Field.PasswordField label="Confirm Password" />
              </Host>
            )}
          />
        </View>
        <AnimatedSpacer height={450} />
      </ScrollView>
      <FormStickySubmitButtonWrapper>
        <Form.SubmitButton disabled={isPending}>
          {isPending && <ActivityIndicator size={16} />}
          <Button.PrimaryLabel>Update Password</Button.PrimaryLabel>
        </Form.SubmitButton>
      </FormStickySubmitButtonWrapper>
    </Form.AppForm>
  );
};
