import { useLanguage } from "@/hooks/use-language";
import { useUpdateShopDeliveryTime } from "@/mutation/delivery-slot-mutation";
import { IShopDeliveryTimes } from "@/types";
import { Spacer, Text } from "@expo/ui";
import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Chip } from "../ui/chip";
import { Host } from "../ui/host";
import { Row } from "../ui/row";
import { Spinner } from "../ui/spinner";
import { ThemedText } from "../ui/themed-text";

type Props = { timeSlots: IShopDeliveryTimes; default?: boolean };

export const DeliverTimeSlotCard = memo(
  ({ timeSlots, default: defaultTimeSlot }: Props) => {
    const { mutateAsync, isPending } = useUpdateShopDeliveryTime();
    const { t } = useLanguage();
    return (
      <Card.Root
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
            <Chip.Root color="success" variant="soft">
              <Chip.Label>{t("default")?.toUpperCase()}</Chip.Label>
            </Chip.Root>
          )}
        </Card.Header>
        <Card.Body className="flex-row flex-wrap gap-1.5 pt-3">
          {timeSlots?.deliveryTimes.map((time) => (
            <Chip.Root key={time.deliveryTimeId} size="sm" variant="secondary">
              <Chip.Label>{time?.deliveryTimeName}</Chip.Label>
            </Chip.Root>
          ))}
        </Card.Body>
        <Card.Footer className="justify-center pt-6">
          {defaultTimeSlot ? (
            <ThemedText className="text-center font-semibold text-success">
              {t("selected")}
            </ThemedText>
          ) : (
            <Host matchContents={{ vertical: true }}>
              <Button
                onPress={async () => {
                  await mutateAsync({
                    shippingCompanyId: timeSlots.shippingCompanyId,
                  });
                }}
              >
                <Row alignment="center">
                  {isPending && <Spinner size={16} />}
                  <Spacer size={4} />
                  <Text>{t("select")}</Text>
                </Row>
              </Button>
            </Host>
          )}
        </Card.Footer>
      </Card.Root>
    );
  },
);
