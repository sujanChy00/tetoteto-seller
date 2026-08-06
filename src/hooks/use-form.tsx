import { Button } from "@/components/ui/buttont";
import { TextInput } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { fieldContext, formContext } from "@/utils/form-hook-context";
import { createFormHook } from "@tanstack/react-form";

const { useAppForm: useForm } = createFormHook({
  fieldComponents: {
    TextInput,
    PasswordInput,
  },
  formComponents: {
    SubmitButton: Button,
  },
  fieldContext,
  formContext,
});

export { useForm };
