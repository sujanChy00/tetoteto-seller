import { useLanguage } from "@/hooks/use-language";
import { ItemDetails } from "@/types";
import { transactionTypeColor } from "@/utils/order-status";
import { View } from "react-native";
import { Chip } from "../ui/chip";
import { Separator } from "../ui/separator";
import { ThemedText } from "../ui/themed-text";

export const ItemDetailsCard = ({ item }: { item: ItemDetails }) => {
  const { t } = useLanguage();
  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between gap-3">
        <ThemedText className="text-xs text-muted">
          {t("item_price_after_tax")}
        </ThemedText>
        <ThemedText className="font-semibold text-[15px] font-mono">
          ¥{item?.itemPrice}
        </ThemedText>
      </View>
      <View className="flex-row items-center justify-between gap-3">
        <ThemedText className="text-xs text-muted">
          {t("item_price_before_tax")}
        </ThemedText>
        <ThemedText className="font-medium text-sm text-muted font-mono">
          ¥{item?.itemPriceBeforeTax}
        </ThemedText>
      </View>
      <View className="flex-row items-center justify-between gap-3">
        <ThemedText className="text-xs text-muted">
          {t("marked_price")}
        </ThemedText>
        <ThemedText className="font-medium text-[14px] text-muted font-mono">
          ¥{item?.itemMarkedPrice}
        </ThemedText>
      </View>
      <Separator />
      <View className="flex-row items-center justify-between gap-3">
        <ThemedText className="text-xs text-muted">{t("stock")}</ThemedText>
        <Chip size="sm" variant="soft" color="success">
          <Chip.Label>{item.itemStock} IN STOCK</Chip.Label>
        </Chip>
      </View>
      <View className="flex-row items-center justify-between gap-3">
        <ThemedText className="text-xs text-muted">{t("category")}</ThemedText>
        <ThemedText className="font-semibold text-[15px] font-mono">
          {item?.itemCategoryName}
        </ThemedText>
      </View>
      <View className="flex-row items-center justify-between gap-3">
        <ThemedText className="text-xs text-muted">{t("sku")}</ThemedText>
        <ThemedText className="font-medium text-xs text-muted">
          ¥{item?.itemSKU}
        </ThemedText>
      </View>
      <Separator />
      <View className="flex-row items-center justify-between gap-3">
        <ThemedText className="text-xs text-muted">{t("weight")}</ThemedText>
        <ThemedText className="font-semibold text-sm font-mono">
          {item?.itemWeight}
        </ThemedText>
      </View>
      <View className="flex-row items-center justify-between gap-3">
        <ThemedText className="text-xs text-muted">{t("item_type")}</ThemedText>
        <Chip variant="secondary" color={transactionTypeColor[item.itemType]}>
          <Chip.Label className="uppercase">{item?.itemType}</Chip.Label>
        </Chip>
      </View>
      <Separator />
      <View className="flex-row items-center justify-between gap-3">
        <View className="gap-1">
          <ThemedText className="text-xs text-muted uppercase font-mono">
            {t("manufacture_date")}{" "}
          </ThemedText>
          <ThemedText className="font-medium">
            {item?.itemMfgDateString}{" "}
          </ThemedText>
        </View>
        <View className="gap-1">
          <ThemedText className="text-xs text-muted uppercase font-mono">
            {t("exp_date")}{" "}
          </ThemedText>
          <ThemedText className="text-danger font-medium">
            {item?.itemExpDateString}{" "}
          </ThemedText>
        </View>
      </View>
    </View>
  );
};
