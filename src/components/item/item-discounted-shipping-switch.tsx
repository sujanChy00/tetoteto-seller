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

export const ItemDiscountedShippingSwitch = ({ data }: Props) => {
  const { t } = useLanguage();
  const { mutate, isPending } = useUpdateItem();
  const discountedShipping = data.itemDetails.discountedShipping;

  const handleToggle = (checked: boolean) => {
    mutate({
      body: {
        canBeMerged: data.itemDetails.mergeable,
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
        discountedShipping: checked,
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

  const isDisabled =
    isPending || data.itemDetails.itemType !== "dry" || isPending;

  return (
    <Pressable
      onPress={() => handleToggle(!discountedShipping)}
      accessibilityRole="switch"
      accessibilityLabel="Mergeable"
      disabled={isDisabled}
      accessibilityState={{ checked: discountedShipping }}
      className={"flex-row items-center justify-between gap-3"}
    >
      <ThemedText className="text-xs font-medium">
        {t("discounted_shipping")}
      </ThemedText>
      <View pointerEvents="none">
        <Host matchContents>
          <Switch
            disabled={isDisabled}
            value={discountedShipping}
            onValueChange={handleToggle}
          />
        </Host>
      </View>
    </Pressable>
  );
};
