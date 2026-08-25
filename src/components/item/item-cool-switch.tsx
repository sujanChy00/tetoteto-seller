import { useLanguage } from "@/hooks/use-language";
import { useUpdateItem } from "@/mutation/item-mutation";
import { IItemDescriptionResponse } from "@/types";
import { SwitchInput } from "../ui/switch-input";

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
    <SwitchInput
      className="justify-between"
      label={t("can_be_sent_in_cool_cart")}
      disabled={isPending}
      value={isMergeable}
      onValueChange={handleToggle}
    />
  );
};
