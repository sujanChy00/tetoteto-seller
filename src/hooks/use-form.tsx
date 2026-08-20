import { DateField } from "@/components/form-inputs/date-field";
import { PasswordField } from "@/components/form-inputs/password-field";
import { RadioField } from "@/components/form-inputs/radio-field";
import { SelectField } from "@/components/form-inputs/select-field";
import { SubmitButton } from "@/components/form-inputs/submit-button";
import { SwitchField } from "@/components/form-inputs/switch-field";
import { TextField } from "@/components/form-inputs/text-field";
import { OTPField } from "@/components/ui/otp-field";
import { fieldContext, formContext } from "@/utils/form-hook-context";
import { createFormHook } from "@tanstack/react-form";

const { useAppForm: useForm } = createFormHook({
  fieldComponents: {
    TextField,
    PasswordField,
    OTPField,
    DateField,
    RadioField,
    SwitchField,
    SelectField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});

export { useForm };
