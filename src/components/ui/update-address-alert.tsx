import { useLanguage } from "@/hooks/use-language";
import {
  useApproveAddressUpdate,
  useCancelAddressUpdate,
} from "@/mutation/order-mutation";
import { ActivityIndicator, View } from "react-native";
import { Alert } from "./alert";
import { DangerButton, WarningButton } from "./button";

type Props = {
  orderId: number;
  isSellerRequest: boolean;
};

export const UpdateAddressAlert = ({ orderId, isSellerRequest }: Props) => {
  const { t } = useLanguage();
  const { mutateAsync, isPending } = useApproveAddressUpdate();
  const { mutateAsync: cancel, isPending: cancelling } =
    useCancelAddressUpdate();
  const approveAddressUpdate = async () => await mutateAsync(orderId);
  const cancelAddressUpdate = async () => await cancel(orderId);
  const description = isSellerRequest ? t("alert_seller") : t("alert_user");
  return (
    <Alert status={isSellerRequest ? "warning" : "danger"}>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title> {t("address_update_request")}</Alert.Title>
        <Alert.Description>{description}</Alert.Description>
        <View className="flex-row justify-end items-center gap-3">
          {isSellerRequest && (
            <WarningButton
              className="px-6"
              disabled={cancelling || isPending}
              onPress={cancelAddressUpdate}
            >
              {cancelling && (
                <ActivityIndicator colorClassName="accent-primary" />
              )}
              <WarningButton.Label>{t("cancel")}</WarningButton.Label>
            </WarningButton>
          )}
          {!isSellerRequest && (
            <DangerButton
              className="px-6"
              disabled={isPending || cancelling}
              onPress={approveAddressUpdate}
            >
              {isPending && (
                <ActivityIndicator colorClassName="accent-danger-foreground" />
              )}
              <DangerButton.Label>{t("approve")}</DangerButton.Label>
            </DangerButton>
          )}
        </View>
      </Alert.Content>
    </Alert>
  );
};
