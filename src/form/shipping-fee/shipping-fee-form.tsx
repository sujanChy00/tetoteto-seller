import { PrimaryButton } from "@/components/ui/button";
import { isIOS } from "@/constants/platform";
import { useForm } from "@/hooks/use-form";
import { useHaptics } from "@/hooks/use-haptics";
import { useLanguage } from "@/hooks/use-language";
import { useUpdateShippingFee } from "@/mutation/shipping-fee-mutation";
import { IshippingFee } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import * as v from "valibot";
import { ShippingFeeFormInput, ShippingFeeSchema } from "./shipping-fee-schema";

interface Props {
  data: IshippingFee | undefined;
  refetch: () => Promise<any>;
}

export const ShippingFeeForm = ({ data, refetch }: Props) => {
  const [refreshing, setRefreshing] = useState(false);
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
      fromAreaCode: String(data?.fromAreaCode ?? ""),
      toAreaCode: "",
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
      >
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          contentContainerClassName="p-4 pb-safe-offset-10"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                refetch().finally(() => setRefreshing(false));
              }}
            />
          }
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
