import { useForm } from "@/hooks/use-form";
import { useHaptics } from "@/hooks/use-haptics";
import { useLanguage } from "@/hooks/use-language";
import { useUpdateTransaction } from "@/mutation/order-mutation";
import { useGetAllShippingCompany } from "@/queries/shipping-fee-query";
import { ShipOrderFormValues, ShipOrderSchema } from "@/schema/order-schema";
import { ITransactionById } from "@/types";
import { useSelector } from "@tanstack/react-form";
import { useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { PrimaryButton, SecondaryButton } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { Separator } from "../ui/separator";

interface Props {
  order: ITransactionById;
  className?: string;
}

export const UpdateOrderTrackingInfo = ({ order, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const hapticFeedBack = useHaptics();
  const { t } = useLanguage();
  const { data: shippingCompanies, isPending: isLoadingShippingCompany } =
    useGetAllShippingCompany({
      enabled: isOpen,
    });

  const Form = useForm({
    defaultValues: {
      trackingNumber: order?.trackingNumber?.toString() ?? "",
      trackingUrl: order?.trackingUrl || "",
      shippingCompany: order?.trackingUrl ? 0 : undefined,
    } as ShipOrderFormValues,
    validators: { onSubmit: ShipOrderSchema },
    onSubmit: async ({ value }) => {
      let data:
        | Omit<ShipOrderFormValues, "shippingCompany">
        | Omit<ShipOrderFormValues, "trackingUrl">;
      if (value.shippingCompany == 0) {
        data = {
          trackingNumber: value.trackingNumber,
          trackingUrl: value.trackingUrl,
        };
      } else {
        data = {
          trackingNumber: value.trackingNumber,
          shippingCompany: Number(value.shippingCompany),
        };
      }

      mutateAsync({
        id: Number(order?.transactionId),
        data,
      });
    },
    onSubmitInvalid: () => {
      hapticFeedBack("error");
    },
  });

  const { mutateAsync, isPending } = useUpdateTransaction({
    onSuccess: () => {
      Form.reset();
      setIsOpen(false);
    },
  });

  const triggerButtonText = useMemo(
    () =>
      order.orderProgress == "SHIPPED"
        ? t("update_tracking_info")
        : t("ship_order"),
    [order.orderProgress],
  );

  const shippingCompany = useSelector(
    Form.store,
    (state) => state.values.shippingCompany,
  );

  const shippingCompanyOptions = useMemo(
    () =>
      shippingCompanies
        ? [
            ...shippingCompanies,
            { id: 0 as unknown as string, name: t("others") },
          ].map((s) => ({
            label: s.name,
            value: s.id,
          }))
        : [],
    [shippingCompanies],
  );

  return (
    <>
      <SecondaryButton className={className} onPress={() => setIsOpen(true)}>
        <SecondaryButton.Label>{triggerButtonText}</SecondaryButton.Label>
      </SecondaryButton>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20}>
          <Form.AppForm>
            <Dialog.Content
              className="max-h-100 p-0 overflow-hidden gap-y-0"
              isPending={isLoadingShippingCompany}
            >
              <ScrollView
                contentContainerClassName="p-6 gap-y-6"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <Dialog.Header>
                  <Dialog.Title>{t("select_shipping_company")}</Dialog.Title>
                </Dialog.Header>
                <View className="gap-y-6">
                  <Form.AppField
                    name="shippingCompany"
                    children={(Field) => (
                      <Field.RadioField
                        className="gap-2"
                        options={shippingCompanyOptions}
                      />
                    )}
                  />
                  <View className="gap-y-3">
                    <Form.AppField
                      name="trackingNumber"
                      children={(Field) => (
                        <Field.TextField
                          maxLength={14}
                          inputMode="numeric"
                          keyboardType="numeric"
                          inputClassName="bg-surface-secondary"
                          label={t("tracking_number")}
                          placeholder={t("enter_tracking_number")}
                        />
                      )}
                    />
                    {shippingCompany == 0 && (
                      <Form.AppField
                        name="trackingUrl"
                        children={(Field) => (
                          <Field.TextField
                            inputMode="url"
                            keyboardType="url"
                            inputClassName="bg-surface-secondary"
                            label={t("tracking_url")}
                            placeholder={t("enter_tracking_url")}
                          />
                        )}
                      />
                    )}
                  </View>
                </View>
              </ScrollView>
              <Separator />
              <Dialog.Footer className="p-4">
                <Dialog.Close
                  disabled={isPending}
                  onPress={() => {
                    setIsOpen(false);
                  }}
                />
                <Form.SubmitButton className="px-6">
                  {isPending && (
                    <ActivityIndicator
                      size={"small"}
                      colorClassName="accent-primary-foreground"
                    />
                  )}
                  <PrimaryButton.Label>{t("done")}</PrimaryButton.Label>
                </Form.SubmitButton>
              </Dialog.Footer>
            </Dialog.Content>
          </Form.AppForm>
        </KeyboardAvoidingView>
      </Dialog>
    </>
  );
};
