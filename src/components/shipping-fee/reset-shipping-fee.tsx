import { isIOS } from "@/constants/platform";
import { useLanguage } from "@/hooks/use-language";
import { useResetShop } from "@/mutation/shop-mutation";
import { useGetAllShippingCompany } from "@/queries/shipping-fee-query";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { DangerSoftButton } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { IOSGlassButton } from "../ui/ios-glass-button";
import { RadioInput } from "../ui/radio-input";
import { ThemedText } from "../ui/themed-text";

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
      {isIOS ? (
        <IOSGlassButton
          label={t("reset")}
          size="small"
          onPress={() => setModalVisible(true)}
        />
      ) : (
        <DangerSoftButton className="h-8" onPress={() => setModalVisible(true)}>
          <DangerSoftButton.Label>{t("reset")} </DangerSoftButton.Label>
        </DangerSoftButton>
      )}
      <Dialog isOpen={modalVisible} onClose={() => setModalVisible(false)}>
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
                  <ActivityIndicator
                    size={"small"}
                    colorClassName="accent-danger-foreground"
                  />
                )}
                <Dialog.ActionLabel variant="danger">
                  {t("reset")}
                </Dialog.ActionLabel>
              </Dialog.Action>
            </Dialog.Footer>
          )}
        </Dialog.Content>
      </Dialog>
    </>
  );
};
