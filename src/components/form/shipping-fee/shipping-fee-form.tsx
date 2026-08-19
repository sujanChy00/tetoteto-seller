import { PrimaryButton } from "@/components/ui/button";
import { isIOS } from "@/constants/platform";
import { useForm } from "@/hooks/use-form";
import { useHaptics } from "@/hooks/use-haptics";
import { useLanguage } from "@/hooks/use-language";
import { useUpdateShippingFee } from "@/mutation/shipping-fee-mutation";
import {
  ShippingFeeFormInput,
  ShippingFeeSchema,
} from "@/schema/shipping-fee-schema";
import { IshippingFee } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import * as v from "valibot";

export const ShippingFeeForm = ({
  data,
}: {
  data: IshippingFee | undefined;
}) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useLanguage();
  const hapticFeedBack = useHaptics();
  const router = useRouter();
  const { mutateAsync, isPending } = useUpdateShippingFee({
    onSuccess: () => {
      router.back();
    },
  });
  const Form = useForm({
    defaultValues: {
      coolShippingFee: String(data?.sellerCoolShippingFee ?? ""),
      frozenShippingFee: String(data?.sellerShippingFrozenShippingFee ?? ""),
      shippingFee: String(data?.sellerShippingFee ?? ""),
      weight: String(data?.sellerShippingWeight ?? ""),
      feeWithTax: String(data?.sellerShippingFee ?? ""),
    } satisfies ShippingFeeFormInput,
    validators: {
      onSubmit: ShippingFeeSchema,
    },
    onSubmitInvalid: () => {
      hapticFeedBack("error");
    },
    onSubmit: async ({ value }) => {
      const parsed = v.parse(ShippingFeeSchema, value);
      await mutateAsync({
        shippingInfo: parsed,
        id: Number(id),
      });
    },
  });
  return (
    <Form.AppForm>
      <KeyboardAvoidingView
        behavior={isIOS ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={40}
      >
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          className="p-4"
          style={{ flex: 1 }}
        >
          <View className="flex-1 gap-y-6">
            <Form.AppField
              name="coolShippingFee"
              children={(Field) => (
                <Field.TextField
                  label={t("cool_shipping_fee")}
                  keyboardType="numeric"
                  inputMode="numeric"
                />
              )}
            />
            <Form.AppField
              name="frozenShippingFee"
              children={(Field) => (
                <Field.TextField
                  label={t("frozen_shipping_fee")}
                  keyboardType="numeric"
                  inputMode="numeric"
                />
              )}
            />
            <Form.AppField
              name="shippingFee"
              children={(Field) => (
                <Field.TextField
                  label={t("shipping_fees")}
                  keyboardType="numeric"
                  inputMode="numeric"
                />
              )}
            />
            <Form.AppField
              name="weight"
              children={(Field) => (
                <Field.TextField
                  isDisabled
                  label={t("weight")}
                  keyboardType="numeric"
                  inputMode="numeric"
                />
              )}
            />
            <Form.SubmitButton>
              {isPending && (
                <ActivityIndicator
                  size={"small"}
                  colorClassName="accent-primary-foreground"
                />
              )}
              <PrimaryButton.Label>{t("update")}</PrimaryButton.Label>
            </Form.SubmitButton>
          </View>
          <View className="h-20" />
        </ScrollView>
      </KeyboardAvoidingView>
    </Form.AppForm>
  );
};
