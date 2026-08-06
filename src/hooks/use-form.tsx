import { OTPField } from "@/components/ui/otp-field";
import { PasswordField } from "@/components/ui/password-field";
import { SubmitButton } from "@/components/ui/submit-button";
import { TextField } from "@/components/ui/text-field";
import { fieldContext, formContext } from "@/utils/form-hook-context";
import { createFormHook } from "@tanstack/react-form";

const { useAppForm: useForm } = createFormHook({
  fieldComponents: {
    TextField,
    PasswordField,
    OTPField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});

export { useForm };
