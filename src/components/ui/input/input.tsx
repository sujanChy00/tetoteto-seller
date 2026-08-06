import { useFieldContext } from "@/utils/form-hook-context";
import { Host, OutlinedTextField, Text } from "@expo/ui/jetpack-compose";
import { Activity } from "react";

interface Props extends React.ComponentProps<typeof OutlinedTextField> {
  label: string;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  leadingIcon?: string;
  trailingIcon?: string;
  supportingText?: string;
}

export const TextInput = ({ label, placeholder, ...props }: Props) => {
  const field = useFieldContext<string | undefined>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Host matchContents>
      <OutlinedTextField {...props}>
        <OutlinedTextField.Label>
          <Text>{label}</Text>
        </OutlinedTextField.Label>
        <Activity mode={placeholder ? "visible" : "hidden"}>
          <OutlinedTextField.Placeholder>
            <Text>{placeholder}</Text>
          </OutlinedTextField.Placeholder>
        </Activity>
        <Activity mode={props.leadingIcon ? "visible" : "hidden"}>
          <OutlinedTextField.LeadingIcon>
            <Text>{props.leadingIcon}</Text>
          </OutlinedTextField.LeadingIcon>
        </Activity>
        <Activity mode={props.trailingIcon ? "visible" : "hidden"}>
          <OutlinedTextField.TrailingIcon>
            <Text>{props.trailingIcon}</Text>
          </OutlinedTextField.TrailingIcon>
        </Activity>
        <Activity mode={props.prefix ? "visible" : "hidden"}>
          <OutlinedTextField.Prefix>
            <Text>{props.prefix}</Text>
          </OutlinedTextField.Prefix>
        </Activity>
        <Activity mode={props.suffix ? "visible" : "hidden"}>
          <OutlinedTextField.Suffix>
            <Text>{props.suffix}</Text>
          </OutlinedTextField.Suffix>
        </Activity>
        <Activity mode={props.supportingText ? "visible" : "hidden"}>
          <OutlinedTextField.SupportingText>
            <Text>{props.supportingText}</Text>
          </OutlinedTextField.SupportingText>
        </Activity>
      </OutlinedTextField>
    </Host>
  );
};
