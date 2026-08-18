import { PasswordField } from "@/components/form-inputs/password-field";
import { RadioField } from "@/components/form-inputs/radio-field";
import { SubmitButton } from "@/components/form-inputs/submit-button";
import { TextField } from "@/components/form-inputs/text-field";
import { OTPField } from "@/components/ui/otp-field";
import { fieldContext, formContext } from "@/utils/form-hook-context";
import { createFormHook } from "@tanstack/react-form";

const { useAppForm: useForm } = createFormHook({
  fieldComponents: {
    TextField,
    PasswordField,
    OTPField,
    RadioField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});

export { useForm };
