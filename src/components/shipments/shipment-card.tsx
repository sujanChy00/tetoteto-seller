import { OrderTrackingResponse } from "@/types";
import { dateTimestampFormatter } from "@/utils/date";
import { useRecyclingState } from "@legendapp/list/react-native";
import { Link } from "expo-router";
import React, { memo } from "react";
import { Pressable, View } from "react-native";
import { Accordion, AccordionLayoutTransition } from "../ui/accordion";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { ThemedText } from "../ui/themed-text";

interface Props {
  shipment: OrderTrackingResponse;
}

export const ShipmentCard = memo(({ shipment }: Props) => {
  const [value, setValue] = useRecyclingState("");
  return (
    <Link
      asChild
      href={{
        pathname: "/order/[orderId]",
        params: {
          orderId: shipment.orderId,
        },
      }}
    >
      <Pressable>
        <Card className="p-0" layout={AccordionLayoutTransition}>
          <Card.Header className="p-3 pb-0" layout={AccordionLayoutTransition}>
            <Card.Description className="uppercase text-[10px] font-semibold">
              ORDER ID
            </Card.Description>
            <Card.Title>#{shipment.orderId}</Card.Title>
            <ThemedText>
              Status:{" "}
              <ThemedText className="text-primary">
                {shipment.currentStatus}
              </ThemedText>
            </ThemedText>
          </Card.Header>
          <Card.Body
            className="gap-1 py-6 px-3"
            layout={AccordionLayoutTransition}
          >
            <View className="flex-row items-center gap-2">
              <ThemedText className="text-muted flex-[0.5]">Name:</ThemedText>
              <ThemedText className="text-left flex-[0.5]">
                {shipment.userFullName}
              </ThemedText>
            </View>
            <View className="flex-row items-center gap-2">
              <ThemedText className="text-muted flex-[0.5]">
                Last Updated:
              </ThemedText>
              <ThemedText className="text-left flex-[0.5]">
                {shipment.lastUpdate || "N/A"}
              </ThemedText>
            </View>
            <View className="flex-row items-center gap-2">
              <ThemedText className="text-muted flex-[0.5]">
                Last Fetched:{" "}
              </ThemedText>
              <ThemedText className="text-left flex-[0.5]">
                {dateTimestampFormatter(shipment.updatedAt || "")}
              </ThemedText>
            </View>
          </Card.Body>
          <Separator />
          <Card.Footer layout={AccordionLayoutTransition}>
            <Accordion
              isCollapsible
              selectionMode="single"
              value={value}
              onValueChange={(v) => setValue(v as string)}
            >
              <Accordion.Item value="shipment-details">
                <Accordion.Trigger>
                  <ThemedText className="flex-1">View Details</ThemedText>
                  <Accordion.Indicator />
                </Accordion.Trigger>
                <Accordion.Content>
                  <View className="gap-6">
                    <View className="rounded-xl bg-primary-soft p-3">
                      <ThemedText className="uppercase text-muted text-[10px] font-medium">
                        Shipping Company: {shipment.shippingCompany}
                      </ThemedText>
                    </View>
                    {!shipment.details || shipment.details?.length === 0 ? (
                      <ThemedText className="text-center text-xs italic text-muted">
                        Nothing to see here
                      </ThemedText>
                    ) : (
                      <View className="gap-3">
                        {shipment.details?.map((detail, index) => (
                          <React.Fragment key={detail.date + index}>
                            <View className="flex-row items-center gap-6">
                              <ThemedText className="uppercase text-muted text-[10px] font-medium">
                                {detail.date}
                              </ThemedText>
                              <View className="gap-1">
                                <ThemedText className="text-xs">
                                  {detail.location}
                                </ThemedText>
                                <ThemedText className="uppercase text-muted text-[10px] font-medium">
                                  {detail.status}
                                </ThemedText>
                              </View>
                            </View>
                            {shipment?.details &&
                              index !== shipment?.details?.length - 1 && (
                                <Separator />
                              )}
                          </React.Fragment>
                        ))}
                      </View>
                    )}
                  </View>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </Card.Footer>
        </Card>
      </Pressable>
    </Link>
  );
});
