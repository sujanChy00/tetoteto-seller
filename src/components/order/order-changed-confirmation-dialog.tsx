import { useLanguage } from "@/hooks/use-language";
import { useChangeOrderStatus } from "@/mutation/order-mutation";
import { IOrderProgress } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { SecondaryButton } from "../ui/button";
import { Dialog } from "../ui/dialog";

interface Props {
  orderStatus: IOrderProgress;
}

export const OrderChangedConfirmationDialog = ({ orderStatus }: Props) => {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync, isPending } = useChangeOrderStatus({
    onSuccess: () => setIsOpen(false),
    onError: () => setIsOpen(false),
  });
  const { t } = useLanguage();
  const description =
    orderStatus == "ORDER_PLACED"
      ? t("order_change_acknowledged_desc")
      : t("order_change_acknowledged_request");
  const btnText =
    orderStatus == "ORDER_PLACED" ? t("acknowledge") : t("request_change");

  const onStatusChange = async () => {
    await mutateAsync({
      orderId: Number(orderId),
      changeTo:
        orderStatus == "ORDER_PLACED"
          ? "SELLER_ACKNOWLEDGED"
          : "PENDING_CHANGE",
    });
  };
  return (
    <>
      <SecondaryButton
        onPress={() => {
          setIsOpen(true);
        }}
        className="flex-1"
      >
        <SecondaryButton.Label>{btnText}</SecondaryButton.Label>
      </SecondaryButton>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{t("confirm_your_action")}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Close
              disabled={isPending}
              onPress={() => {
                setIsOpen(false);
              }}
            />
            <Dialog.Action variant="danger" onPress={onStatusChange}>
              {isPending && (
                <ActivityIndicator
                  size={"small"}
                  colorClassName="accent-danger-foreground"
                />
              )}
              <Dialog.ActionLabel variant="danger">
                {t("confirm")}
              </Dialog.ActionLabel>
            </Dialog.Action>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
};
