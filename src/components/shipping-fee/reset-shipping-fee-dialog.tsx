import { useLanguage } from "@/hooks/use-language";
import { useResetShop } from "@/mutation/shop-mutation";
import { useGetAllShippingCompany } from "@/queries/shipping-fee-query";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Dialog } from "../ui/dialog";
import { RadioInput } from "../ui/radio-input";
import { ThemedText } from "../ui/themed-text";

interface Props {
  isVisible: boolean;
  setIsVisible: (v: boolean) => void;
}

export const ResetShippingFeeDialog = ({ isVisible, setIsVisible }: Props) => {
  const [shippingId, setShippingId] = useState<string>();
  const { t } = useLanguage();

  const { mutateAsync, isPending: isResetingShop } = useResetShop({
    onSuccess: () => {
      setIsVisible(false);
      setShippingId("");
    },
  });
  const { data: shippingCompanies, isPending: loadingShippingCompanies } =
    useGetAllShippingCompany({
      enabled: isVisible,
    });

  const shippingCompaniesList = shippingCompanies ?? [];

  const isDisabled = loadingShippingCompanies || isResetingShop || !shippingId;

  return (
    <Dialog isOpen={isVisible} onClose={() => false}>
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
                setIsVisible(false);
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
  );
};
