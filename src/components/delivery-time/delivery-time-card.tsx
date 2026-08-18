import { useLanguage } from "@/hooks/use-language";
import { useUpdateShopDeliveryTime } from "@/mutation/delivery-slot-mutation";
import { IShopDeliveryTimes } from "@/types";
import { memo } from "react";
import { ActivityIndicator } from "react-native";
import { twMerge } from "tailwind-merge";
import { PrimaryButton } from "../ui/button";
import { Card } from "../ui/card";
import { Chip } from "../ui/chip";
import { ThemedText } from "../ui/themed-text";

type Props = { timeSlots: IShopDeliveryTimes; default?: boolean };

export const DeliverTimeSlotCard = memo(
  ({ timeSlots, default: defaultTimeSlot }: Props) => {
    const { mutateAsync, isPending } = useUpdateShopDeliveryTime();
    const { t } = useLanguage();
    return (
      <Card
        className={twMerge(
          "justify-between",
          defaultTimeSlot ? "border-2 border-success" : "",
        )}
      >
        <Card.Header className="flex-row items-center justify-between">
          <Card.Title className="text-lg font-semibold">
            {timeSlots?.shippingCompanyName}
          </Card.Title>
          {defaultTimeSlot && (
            <Chip color="success" variant="soft">
              <Chip.Label>{t("default")?.toUpperCase()}</Chip.Label>
            </Chip>
          )}
        </Card.Header>
        <Card.Body className="flex-row flex-wrap gap-1.5 pt-3">
          {timeSlots?.deliveryTimes.map((time) => (
            <Chip key={time.deliveryTimeId} size="sm" variant="secondary">
              <Chip.Label>{time?.deliveryTimeName}</Chip.Label>
            </Chip>
          ))}
        </Card.Body>
        <Card.Footer className="justify-center pt-6">
          {defaultTimeSlot ? (
            <ThemedText className="text-center font-semibold text-success">
              {t("selected")}
            </ThemedText>
          ) : (
            <PrimaryButton
              onPress={async () => {
                await mutateAsync({
                  shippingCompanyId: timeSlots.shippingCompanyId,
                });
              }}
            >
              {isPending && <ActivityIndicator size={16} />}
              <PrimaryButton.Label>{t("select")}</PrimaryButton.Label>
            </PrimaryButton>
          )}
        </Card.Footer>
      </Card>
    );
  },
);
