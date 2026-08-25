import { useLanguage } from "@/hooks/use-language";
import { useUpdateItem } from "@/mutation/item-mutation";
import { IItemDescriptionResponse } from "@/types";
import { SwitchInput } from "../ui/switch-input";

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
    <SwitchInput
      className="justify-between"
      label={t("discounted_shipping")}
      disabled={isDisabled}
      value={discountedShipping}
      onValueChange={handleToggle}
    />
  );
};
