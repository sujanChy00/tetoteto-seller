import { DangerSoftButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StyledSymbolView } from "@/components/ui/symbol-view";
import { ThemedText } from "@/components/ui/themed-text";
import { useLanguage } from "@/hooks/use-language";
import { useDeleteItemVariation } from "@/mutation/item-mutation";
import { IItemVaritions } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { memo } from "react";
import { ActivityIndicator, Alert, TouchableOpacity, View } from "react-native";

export const ItemVariationCard = memo(
  ({ variation }: { variation: IItemVaritions }) => {
    const { t } = useLanguage();
    const router = useRouter();
    const { itemId } = useLocalSearchParams<{ itemId: string }>();
    const isDefault = variation.name.toLowerCase() === "default";

    const { mutateAsync, isPending } = useDeleteItemVariation();

    const onDelete = async () => {
      Alert.alert("Delete", "Are you sure you want to delete this variation?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await mutateAsync({
              itemId,
              variationName: variation.name,
            });
          },
        },
      ]);
    };

    return (
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/item/[itemId]/variation/[variationName]",
            params: {
              itemId,
              variationName: variation.name,
            },
          });
        }}
      >
        <Card className={"p-0 border border-border shadow-none"}>
          <Card.Header
            className={"flex-row items-center p-3 justify-between gap-1"}
          >
            <Card.Title className="uppercase">{variation.name}</Card.Title>
            {!isDefault && (
              <DangerSoftButton onPress={onDelete} disabled={isPending}>
                {isPending ? (
                  <ActivityIndicator colorClassName="accent-danger" />
                ) : (
                  <StyledSymbolView
                    tintColorClassName="accent-danger"
                    name={{
                      android: "delete",
                      ios: "trash",
                    }}
                  />
                )}
              </DangerSoftButton>
            )}
          </Card.Header>
          <Card.Body className={"border-t border-t-border"}>
            <View className="flex-row items-center">
              <View className="flex-1 p-3">
                <ThemedText className="text-muted text-xs">
                  {t("price")}
                </ThemedText>
                <ThemedText className="font-semibold">
                  ¥{variation.price}
                </ThemedText>
              </View>
              <View className="flex-1 p-3 border-r border-r-border border-l border-l-border">
                <ThemedText className="text-muted text-xs">
                  {t("before_tax")}
                </ThemedText>
                <ThemedText className="font-semibold">
                  ¥{variation.beforeTaxPrice}
                </ThemedText>
              </View>
              <View className="flex-1 p-3">
                <ThemedText className="text-muted text-xs">
                  {t("weight")}
                </ThemedText>
                <ThemedText className="font-semibold">
                  {variation.weight} g
                </ThemedText>
              </View>
            </View>
            <View className="p-3 border-t border-t-border flex-row items-center gap-3 justify-between">
              <ThemedText className="text-xs text-muted">In stock</ThemedText>
              <ThemedText className="font-semibold">
                {variation.stock} units
              </ThemedText>
            </View>
          </Card.Body>
        </Card>
      </TouchableOpacity>
    );
  },
);
