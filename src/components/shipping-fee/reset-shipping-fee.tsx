import { useLanguage } from "@/hooks/use-language";
import { useResetShop } from "@/mutation/shop-mutation";
import { useGetAllShippingCompany } from "@/queries/shipping-fee-query";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { RadioInput } from "../ui/radio-input";
import { ThemedText } from "../ui/themed-text";
import { ResetShippingFeeButton } from "./reset-shipping-fee-button.tsx";

export const ResetShippingFee = () => {
  const [shippingId, setShippingId] = useState<string>();
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useLanguage();

  const { mutateAsync, isPending: isResetingShop } = useResetShop({
    onSuccess: () => {
      setModalVisible(false);
      setShippingId("");
    },
  });
  const { data: shippingCompanies, isPending: loadingShippingCompanies } =
    useGetAllShippingCompany({
      enabled: modalVisible,
    });

  const shippingCompaniesList = shippingCompanies ?? [];

  const isDisabled = loadingShippingCompanies || isResetingShop || !shippingId;

  return (
    <>
      <Dialog.Root isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Dialog.Content isPending={loadingShippingCompanies}>
          <Dialog.Header>
            <Dialog.Title>{t("reset_company_title")}</Dialog.Title>
            <Dialog.Description>
              {t("reset_company_description")}
            </Dialog.Description>
          </Dialog.Header>
          {shippingCompaniesList.length > 0 ? (
            <View>
              {shippingCompaniesList.map((company) => (
                <RadioInput
                  className="py-1"
                  label={company.name}
                  key={company.id}
                  selected={company.id === shippingId}
                  onPress={() => setShippingId(company.id)}
                />
              ))}
            </View>
          ) : (
            <ThemedText className="text-danger italic">
              No shipping companies to reset
            </ThemedText>
          )}
          {shippingCompaniesList.length > 0 && (
            <Dialog.Footer>
              <Dialog.Close
                disabled={isResetingShop}
                onPress={() => {
                  setModalVisible(false);
                }}
              />
              <Dialog.Action
                disabled={isDisabled}
                variant="danger"
                onPress={async () => await mutateAsync(Number(shippingId))}
              >
                {isResetingShop && (
                  <ActivityIndicator colorClassName="accent-danger-foreground" />
                )}
                <Button.DangerLabel>{t("reset")}</Button.DangerLabel>
              </Dialog.Action>
            </Dialog.Footer>
          )}
        </Dialog.Content>
      </Dialog.Root>
      <ResetShippingFeeButton onPress={() => setModalVisible(true)} />
    </>
  );
};
