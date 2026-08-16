import { IshippingFee } from "@/types";
import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import { Card } from "../ui/card";
import { Chip } from "../ui/chip";
import { Surface } from "../ui/surface";
import { ThemedText } from "../ui/themed-text";

interface Props {
  shippingFee: IshippingFee;
  primaryColor: string;
  warningColor: string;
  successColor: string;
}

export const ShippingFeeCard = memo(
  ({ shippingFee, primaryColor, warningColor, successColor }: Props) => {
    return (
      <Link
        href={{
          pathname: "/shipping-fee/[id]",
          params: {
            id: shippingFee.sellerShippingId,
          },
        }}
        asChild
      >
        <TouchableOpacity>
          <Card.Root className="gap-10">
            <Card.Body className="relative flex-row items-stretch ">
              <View className="h-full w-0.5 bg-success-soft" />
              <View className="gap-10 flex-1 -translate-x-1.5">
                <View className="flex-row items-start gap-6">
                  <View className="size-2.5 rounded-full bg-success" />
                  <View className="flex-row items-center justify-between -translate-y-0.5 gap-6 flex-1">
                    <View className="flex-1">
                      <ThemedText className="uppercase text-[10px] font-medium text-muted">
                        ORIGIN
                      </ThemedText>
                      <ThemedText
                        numberOfLines={2}
                        className="text-lg font-semibold"
                      >
                        {shippingFee.sellerShippingFromArea}
                      </ThemedText>
                    </View>
                    <Chip
                      variant="soft"
                      color="primary"
                      size="sm"
                      className="rounded-lg border-primary border"
                    >
                      <Chip.Label>
                        Weight {shippingFee.sellerShippingWeight}
                      </Chip.Label>
                    </Chip>
                  </View>
                </View>
                <View className="flex-row items-start gap-6">
                  <View className="border-2 border-success size-2.5 rounded-full" />
                  <View className="-translate-y-0.5 flex-1">
                    <ThemedText className="uppercase text-[10px] font-medium text-muted">
                      DESTINATION
                    </ThemedText>
                    <ThemedText
                      className="text-lg font-semibold"
                      numberOfLines={2}
                    >
                      {shippingFee.sellerShippingToArea}
                    </ThemedText>
                  </View>
                </View>
              </View>
            </Card.Body>
            <Card.Footer className="flex-row items-stretch gap-3">
              <Surface variant="tertiary" className="items-center gap-3 flex-1">
                <Chip
                  variant="soft"
                  color="primary"
                  className="size-10 rounded-full p-0 mx-auto"
                >
                  <SymbolView
                    tintColor={primaryColor as string}
                    name={{
                      android: "ac_unit",
                      ios: "snowflake",
                    }}
                    size={18}
                  />
                </Chip>
                <View className="gap-0.5">
                  <ThemedText className="text-muted text-[10px] text-center font-medium">
                    FROZEN
                  </ThemedText>
                  <ThemedText className="font-semibold text-center">
                    ¥
                    {shippingFee.sellerShippingFrozenShippingFee.toLocaleString()}
                  </ThemedText>
                </View>
              </Surface>
              <Surface variant="tertiary" className="items-center gap-3 flex-1">
                <Chip
                  variant="soft"
                  color="warning"
                  className="size-10 rounded-full p-0 mx-auto"
                >
                  <SymbolView
                    tintColor={warningColor as string}
                    name={{
                      android: "local_fire_department",
                      ios: "flame.fill",
                    }}
                    size={18}
                  />
                </Chip>
                <View className="gap-0.5">
                  <ThemedText className="text-muted text-[10px] text-center font-medium">
                    DRY
                  </ThemedText>
                  <ThemedText className="font-semibold text-center">
                    ¥{shippingFee.sellerShippingFee.toLocaleString()}
                  </ThemedText>
                </View>
              </Surface>
              <Surface variant="tertiary" className="items-center gap-3 flex-1">
                <Chip
                  variant="soft"
                  color="success"
                  className="size-10 rounded-full p-0 mx-auto"
                >
                  <SymbolView
                    tintColor={successColor as string}
                    name={{
                      android: "thermostat",
                      ios: "thermometer.high",
                    }}
                    size={18}
                  />
                </Chip>
                <View className="gap-0.5">
                  <ThemedText className="text-muted text-[10px] text-center font-medium">
                    COOL
                  </ThemedText>
                  <ThemedText className="font-semibold text-center">
                    ¥{shippingFee.sellerCoolShippingFee.toLocaleString()}
                  </ThemedText>
                </View>
              </Surface>
            </Card.Footer>
          </Card.Root>
        </TouchableOpacity>
      </Link>
    );
  },
);
