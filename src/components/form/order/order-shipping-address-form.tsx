import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { PrimaryButton } from "@/components/ui/button";
import { isIOS } from "@/constants/platform";
import { useForm } from "@/hooks/use-form";
import { useHaptics } from "@/hooks/use-haptics";
import { useLanguage } from "@/hooks/use-language";
import {
  useChangeShippingAddress,
  useUpdateShippingAddress,
} from "@/mutation/order-mutation";
import { useGetAddressInfo } from "@/queries/auth-query";
import {
  ShippingAddressFormValues,
  ShippingAddressSchema,
} from "@/schema/order-schema";
import { ITransactionById } from "@/types";
import { successToast } from "@/utils/toast";
import { useSelector } from "@tanstack/react-form";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

interface Props {
  address?: ITransactionById;
  refetch: () => Promise<any>;
}

export const OrderShippingAddressForm = ({ address, refetch }: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const haptics = useHaptics();
  const {
    mutateAsync: udpateShippingAddress,
    isPending: updatingShippingAddress,
  } = useUpdateShippingAddress({
    onSuccess: () => {
      router.back();
    },
  });
  const {
    mutateAsync: changeShippingAddress,
    isPending: changingShippingAddress,
  } = useChangeShippingAddress({
    onSuccess: () => {
      router.back();
    },
  });
  const prefecture =
    address?.updateAddressRequest?.prefecture.name ??
    address?.userDetail.prefecture;
  const Form = useForm({
    defaultValues: {
      address1: address?.updateAddressRequest?.address1 ?? "",
      address2: address?.updateAddressRequest?.address2 ?? "",
      city: address?.updateAddressRequest?.city ?? "",
      postalCode: address?.updateAddressRequest?.postalCode ?? "",
      prefecture: prefecture ?? "",
    } satisfies ShippingAddressFormValues,
    validators: {
      onSubmit: ShippingAddressSchema,
    },
    onSubmitInvalid: () => {
      haptics("error");
    },
    onSubmit: async ({ value }) => {
      const canChange = address && sellerRequest;
      const { prefecture, ...rest } = value;
      const body = { orderid: Number(orderId), data: rest };
      if (canChange) {
        await changeShippingAddress(body);
        return;
      }
      await udpateShippingAddress(body);
    },
  });

  const sellerRequest = !!address?.updateAddressRequest;
  const isPending = updatingShippingAddress || changingShippingAddress;
  const postalCode = useSelector(
    Form.store,
    (field) => field.values.postalCode,
  );

  const { data: addressInfo, isLoading: loadingAddressInfo } =
    useGetAddressInfo({
      postalCode,
      enabled: postalCode.length === 7,
    });

  useEffect(() => {
    if (addressInfo) {
      const isValidAddress =
        addressInfo && prefecture?.includes(addressInfo.pref);
      if (isValidAddress) {
        Form.setFieldValue("address1", addressInfo.city);
        Form.setFieldValue("city", addressInfo.city);
        successToast({
          title: t("fields_auto_filled"),
        });
      }
    }
  }, [addressInfo]);

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
            refetch ? (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  refetch().finally(() => setRefreshing(false));
                }}
              />
            ) : undefined
          }
          style={{ flex: 1 }}
        >
          <View className="gap-y-6">
            <Form.AppField
              name="prefecture"
              children={(Field) => (
                <Field.TextField label={t("prefecture")} isDisabled />
              )}
            />
            <Form.AppField
              name="postalCode"
              children={(Field) => <Field.TextField label={t("postal_code")} />}
            />
            <Form.AppField
              name="address1"
              children={(Field) => <Field.TextField label={t("address1")} />}
            />
            <Form.AppField
              name="address2"
              children={(Field) => <Field.TextField label={t("address2")} />}
            />
            <Form.AppField
              name="city"
              children={(Field) => <Field.TextField label={t("city")} />}
            />
            <Form.SubmitButton disabled={isPending || loadingAddressInfo}>
              {isPending && (
                <ActivityIndicator
                  size="small"
                  colorClassName="accent-primary-foreground"
                />
              )}
              <PrimaryButton.Label>
                {loadingAddressInfo ? "fields auto-filling" : t("update")}
              </PrimaryButton.Label>
            </Form.SubmitButton>
          </View>
          <AnimatedSpacer height={100} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Form.AppForm>
  );
};
