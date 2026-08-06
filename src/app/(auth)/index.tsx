import { useForm } from "@/hooks/use-form";
import { View } from "react-native";

const LoginScreen = () => {
  const Form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <View className="flex-1 p-safe">
      <Form.AppForm>
        <Form.AppField
          name="email"
          children={(field) => (
            <field.TextInput placeholder="email" label="Email" />
          )}
        />
        <Form.AppField
          name="password"
          children={(field) => (
            <field.PasswordInput placeholder="password" label="Password" />
          )}
        />
      </Form.AppForm>
    </View>
  );
};

export default LoginScreen;
