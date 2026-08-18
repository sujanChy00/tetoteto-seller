import { useLanguage } from "@/hooks/use-language";
import {
  useApproveAddressUpdate,
  useCancelAddressUpdate,
} from "@/mutation/order-mutation";
import { ActivityIndicator, View } from "react-native";
import { Alert } from "./alert";
import { GhostButton, PrimaryButton } from "./button";

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
    <Alert status="warning">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title> {t("address_update_request")}</Alert.Title>
        <Alert.Description>{description}</Alert.Description>
        <View className="flex-row justify-end items-center gap-3">
          {isSellerRequest && (
            <GhostButton
              disabled={cancelling || isPending}
              onPress={cancelAddressUpdate}
            >
              {cancelling && (
                <ActivityIndicator colorClassName="accent-primary" />
              )}
              <GhostButton.Label>{t("cancel")}</GhostButton.Label>
            </GhostButton>
          )}
          {!isSellerRequest && (
            <PrimaryButton
              disabled={isPending || cancelling}
              onPress={approveAddressUpdate}
            >
              {isPending && (
                <ActivityIndicator colorClassName="accent-primary-foreground" />
              )}
              <PrimaryButton.Label>{t("approve")}</PrimaryButton.Label>
            </PrimaryButton>
          )}
        </View>
      </Alert.Content>
    </Alert>
  );
};
