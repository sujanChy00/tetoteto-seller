import { Accordion } from "@/components/ui/accordion";
import { Chip } from "@/components/ui/chip";
import { ThemedText } from "@/components/ui/themed-text";
import { useGetAllShippingArea } from "@/queries/campaign-query";
import { IShippingArea } from "@/types";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { twMerge } from "tailwind-merge";

interface Props {
  value: number[];
  onChange: (value: number[]) => void;
}

export const ShippingAreaSelector = ({ value, onChange }: Props) => {
  const [accordionValue, setAccordionValue] = useState("");
  const { data: shippingAreas, isPending } = useGetAllShippingArea(
    accordionValue === "shipping-areas",
  );
  return (
    <Accordion
      isCollapsible
      selectionMode="single"
      value={accordionValue}
      variant="surface"
      onValueChange={(value) => {
        setAccordionValue(value as string);
      }}
    >
      <Accordion.Item value="shipping-areas">
        <Accordion.Trigger className="py-4 px-6">
          <ThemedText className="flex-1">Select Shipping Areas</ThemedText>
          <Accordion.Indicator />
        </Accordion.Trigger>
        <Accordion.Content>
          <ShippingAreaSelectorContent
            isPending={isPending}
            shippingAreas={shippingAreas ?? []}
            value={value}
            onChange={onChange}
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

const ShippingAreaSelectorContent = ({
  isPending,
  shippingAreas,
  value,
  onChange,
}: {
  isPending: boolean;
  shippingAreas: IShippingArea[];
  value: number[];
  onChange: (value: number[]) => void;
}) => {
  if (isPending)
    return (
      <View className="items-center justify-center h-10">
        <ActivityIndicator size={"small"} />
      </View>
    );
  if (!shippingAreas || shippingAreas.length === 0)
    return (
      <View className="items-center justify-center h-10">
        <ThemedText className="text-muted italic text-xs">
          No shipping areas available.
        </ThemedText>
      </View>
    );

  return (
    <View className="flex-row items-center gap-3 flex-wrap p-3">
      {shippingAreas.map((area) => {
        const isSelected = value.includes(area.shippingAreaId);
        return (
          <Chip
            color={isSelected ? "success" : "default"}
            variant={"soft"}
            className={twMerge(
              "border rounded-md",
              isSelected ? "border-success" : "border-foreground",
            )}
            onPress={() => {
              if (isSelected) {
                onChange(value.filter((id) => id !== area.shippingAreaId));
              } else {
                onChange([...value, area.shippingAreaId]);
              }
            }}
            key={area.shippingAreaId}
          >
            <Chip.Label>{area.shippingArea}</Chip.Label>
          </Chip>
        );
      })}
    </View>
  );
};
