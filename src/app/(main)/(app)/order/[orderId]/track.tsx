import { PendingComponent } from "@/components/layout/pending-component";
import { GhostButton } from "@/components/ui/button";
import { FalllBackMesage } from "@/components/ui/fallback-message";
import { Separator } from "@/components/ui/separator";
import { Surface } from "@/components/ui/surface";
import { StyledSymbolView } from "@/components/ui/symbol-view";
import { ThemedText } from "@/components/ui/themed-text";
import { useGetOrderTrackingDetails } from "@/queries/order-query";
import { dateTimestampFormatter } from "@/utils/date";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams } from "expo-router";
import { Fragment, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { twMerge } from "tailwind-merge";

const TrackOrderScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const { data, isPending, refetch, error } = useGetOrderTrackingDetails(
    Number(orderId),
  );
  if (isPending) return <PendingComponent />;

  if (!data)
    return (
      <FalllBackMesage
        message={error?.message || "Tracking details failed to load"}
      />
    );

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(data.trackingNumber);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            refetch().finally(() => setRefreshing(false));
          }}
        />
      }
      contentContainerClassName="p-2 pt-6"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="gap-6">
        <Surface className="gap-6">
          {!!data.shippingCompany && (
            <View className="gap-1">
              <ThemedText className="uppercase font-medium text-xs text-muted">
                Shipping Company
              </ThemedText>
              <ThemedText className="font-bold text-primary text-lg">
                {data.shippingCompany}
              </ThemedText>
            </View>
          )}
          <View className="gap-2">
            <ThemedText className="uppercase font-medium text-xs text-muted">
              Status
            </ThemedText>
            <ThemedText
              className={twMerge(
                "font-semibold text-xs",
                data.deliveredAt
                  ? "text-success"
                  : data.lastUpdate
                    ? "text-foreground"
                    : "text-danger",
              )}
            >
              {data.currentStatus}
            </ThemedText>
          </View>
          {data?.shippingCompany && (
            <View className="gap-2">
              <ThemedText className="uppercase font-medium text-xs text-muted">
                Recipient Name
              </ThemedText>
              <ThemedText className="font-semibold text-[15px]">
                {data.userFullName}
              </ThemedText>
            </View>
          )}
          {!!data.trackingNumber && (
            <View className="gap-5">
              <ThemedText className="uppercase font-medium text-xs text-muted">
                Tracking Number
              </ThemedText>
              <View className="bg-surface-secondary px-3 py-4 flex-row items-center justify-between rounded-2xl border border-dashed border-separator">
                <ThemedText className="font-semibold text-base">
                  {data.trackingNumber}
                </ThemedText>
                <GhostButton onPress={copyToClipboard} className="h-10">
                  <GhostButton.Label>
                    <StyledSymbolView
                      name={{
                        android: "content_copy",
                        ios: "doc.on.doc",
                      }}
                      tintColorClassName="accent-primary"
                      size={20}
                    />
                  </GhostButton.Label>
                </GhostButton>
              </View>
            </View>
          )}
        </Surface>
        <Surface className=" gap-3">
          {!!data.deliveredAt && (
            <View className="gap-1.5">
              <ThemedText className="text-[10px] font-medium text-muted uppercase">
                Delivered At
              </ThemedText>
              <ThemedText className="text-xs font-bold font-mono">
                {dateTimestampFormatter(data.deliveredAt)}
              </ThemedText>
            </View>
          )}
          {data.lastUpdate && (
            <View className="gap-1.5">
              <ThemedText className="text-[10px] font-medium text-muted uppercase">
                Last Updated
              </ThemedText>
              <ThemedText className="text-xs font-bold font-mono">
                {data.lastUpdate}
              </ThemedText>
            </View>
          )}
          {data.updatedAt && (
            <View className="gap-1.5">
              <ThemedText className="text-[10px] font-medium text-muted uppercase">
                Last Fetched
              </ThemedText>
              <ThemedText className="text-xs font-bold font-mono">
                {dateTimestampFormatter(data.updatedAt)}
              </ThemedText>
            </View>
          )}
        </Surface>
        <View className="gap-5 pt-4">
          <ThemedText className="font-serif text-base font-medium text-muted uppercase">
            Shipping Activity
          </ThemedText>
          {data.details && data.details.length > 0 ? (
            <View className="gap-3">
              {data.details?.map((detail, i) => (
                <Fragment key={i}>
                  <View className="flex-row justify-between">
                    <View className="gap-1">
                      <ThemedText>{detail.status}</ThemedText>
                      <ThemedText className="text-xs text-muted">
                        {detail.location}
                      </ThemedText>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <StyledSymbolView
                        name={{
                          android: "pace",
                          ios: "clock",
                        }}
                        size={11}
                        tintColorClassName="accent-muted"
                      />
                      <ThemedText className="text-muted text-[11px]">
                        {detail.date}
                      </ThemedText>
                    </View>
                  </View>
                  <Separator />
                </Fragment>
              ))}
            </View>
          ) : (
            <ThemedText className="text-center text-sm font-serif italic text-muted">
              No shipping activity yet
            </ThemedText>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default TrackOrderScreen;
