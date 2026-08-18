import { useLanguage } from "@/hooks/use-language";
import { useUpdateItem } from "@/mutation/item-mutation";
import { IItemDescriptionResponse } from "@/types";
import { Switch } from "@expo/ui";
import { Pressable, View } from "react-native";
import { Host } from "../ui/host";
import { ThemedText } from "../ui/themed-text";

type Props = {
  data: IItemDescriptionResponse;
};

export const ItemCoolSwitch = ({ data }: Props) => {
  const { t } = useLanguage();
  const { mutate, isPending } = useUpdateItem();
  const isMergeable = data.itemDetails.mergeable;

  const handleToggle = (checked: boolean) => {
    mutate({
      body: {
        canBeMerged: checked,
        categoryId: data.itemDetails.itemCategoryId,
        expiryDate: data.itemDetails.itemExpDate,
        item_images: data.itemImages.images,
        manufactureDate: data.itemDetails.itemMfgDate,
        price: data.itemDetails.itemPrice,
        sku: data.itemDetails.itemSKU,
        stock: data.itemDetails.itemStock,
        type: data.itemDetails.itemType,
        weight: data.itemDetails.itemWeight,
        markedPrice: data.itemDetails.itemMarkedPrice,
        discountedShipping: data.itemDetails.discountedShipping,
        itemLanguageList: data.itemDescription?.map((item) => ({
          itemName: item.itemName,
          itemDescription: item.itemDesc,
          languageCode: item.language,
          itemTags: item.itemTags?.join(","),
        })),
      },
      itemId: data.itemDetails.itemId,
    });
  };

  return (
    <Pressable
      onPress={() => handleToggle(!isMergeable)}
      accessibilityRole="switch"
      disabled={isPending}
      accessibilityLabel="Recommended"
      accessibilityState={{ checked: isMergeable }}
      className={"flex-row items-center justify-between gap-3"}
    >
      <ThemedText className="text-xs font-medium">
        {t("can_be_sent_in_cool_cart")}
      </ThemedText>
      <View pointerEvents="none">
        <Host matchContents>
          <Switch
            disabled={isPending}
            value={isMergeable}
            onValueChange={handleToggle}
          />
        </Host>
      </View>
    </Pressable>
  );
};
