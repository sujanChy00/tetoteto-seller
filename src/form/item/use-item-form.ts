import { useForm } from "@/hooks/use-form";
import { useHaptics } from "@/hooks/use-haptics";
import { useLanguage } from "@/hooks/use-language";
import {
  useAddItem,
  useCopyItem,
  useUpdateItem,
} from "@/mutation/item-mutation";
import {
  IItemDescriptionResponse,
  IItemLanguageList,
  ILanguageCode,
} from "@/types";
import { formatDate } from "@/utils/date";
import { errorToast } from "@/utils/toast";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import * as v from "valibot";
import { ItemFormInput, itemFormSchema } from "./item-schema";

interface Props {
  item?: IItemDescriptionResponse;
  itemId?: string;
  copyItem?: boolean;
}

export const useItemForm = ({ item, itemId, copyItem }: Props) => {
  const router = useRouter();
  const { t } = useLanguage();
  const haptics = useHaptics();
  const getItemByLan = useCallback(
    (lan: ILanguageCode) => {
      if (!item) return null;
      return item?.itemDescription?.find((item) => item?.language === lan);
    },
    [item],
  );
  const goBack = () => router.back();

  const { mutateAsync: updateMutation, isPending: updatingItem } =
    useUpdateItem({
      onSuccess: () => goBack(),
    });
  const { mutateAsync: copyMutation, isPending: copyingItem } = useCopyItem({
    onSuccess: () => goBack(),
  });
  const { mutateAsync: addMutation, isPending: addingItem } = useAddItem({
    onSuccess: () => goBack(),
  });

  const Form = useForm({
    defaultValues: {
      englishLanguageList: {
        languageCode: "en_US",
        itemName: getItemByLan("en_US")?.itemName || "",
        itemDescription: getItemByLan("en_US")?.itemDesc || "",
        itemTags: getItemByLan("en_US")?.itemTags?.join(", ") || "",
      },
      nepaliLanguageList: {
        languageCode: "ne_NP",
        itemName: getItemByLan("ne_NP")?.itemName ?? "",
        itemDescription: getItemByLan("ne_NP")?.itemDesc ?? "",
        itemTags: getItemByLan("ne_NP")?.itemTags?.join(", ") ?? "",
      },
      japaneseLanguageList: {
        languageCode: "ja_JP",
        itemName: getItemByLan("ja_JP")?.itemName ?? "",
        itemDescription: getItemByLan("ja_JP")?.itemDesc ?? "",
        itemTags: getItemByLan("ja_JP")?.itemTags?.join(", ") ?? "",
      },
      vientameseLanguageList: {
        languageCode: "vi_VN",
        itemName: getItemByLan("vi_VN")?.itemName ?? "",
        itemDescription: getItemByLan("vi_VN")?.itemDesc ?? "",
        itemTags: getItemByLan("vi_VN")?.itemTags?.join(", ") ?? "",
      },
      canBeMerged: item?.itemDetails.mergeable ?? true,
      discountedShipping: item?.itemDetails.discountedShipping ?? false,
      categoryId: String(item?.itemDetails.itemCategoryId ?? ""),
      weight: String(item?.itemDetails.itemWeight ?? ""),
      expiryDate: item
        ? new Date(String(item.itemDetails.itemExpDate))
        : new Date(),
      manufactureDate: item
        ? new Date(String(item.itemDetails.itemMfgDate))
        : new Date(),
      markedPrice: String(item?.itemDetails.itemMarkedPrice ?? ""),
      price: String(item?.itemDetails.itemPrice ?? ""),
      sku: item?.itemDetails.itemSKU || "",
      stock: String(item?.itemDetails.itemStock ?? ""),
      type: item?.itemDetails?.itemType ?? "cool",
      itemImages: item?.itemImages?.images ?? [],
      indianShop: false as boolean,
    } satisfies ItemFormInput,
    validators: {
      onSubmit: itemFormSchema,
    },
    onSubmitInvalid: () => {
      haptics("error");
    },
    onSubmit: async ({ value }) => {
      const parsed = v.parse(itemFormSchema, value);
      if (parsed.discountedShipping && Number(parsed.weight) > 2) {
        errorToast({
          title: t("discounted_shipping_error_message"),
        });
        return;
      }
      const { itemImages, ...rest } = parsed;
      const body = {
        ...rest,
        manufactureDate: formatDate(parsed.manufactureDate),
        expiryDate: formatDate(parsed.expiryDate),
        categoryId: Number(parsed.categoryId),
        weight: Number(parsed.weight),
        canBeMerged:
          parsed.type === "cool" ? false : (parsed.canBeMerged as boolean),
        markedPrice: Number(parsed.markedPrice),
        price: Number(parsed.price),
        stock: Number(parsed.stock),
        discountedShipping:
          parsed.type !== "dry"
            ? false
            : (parsed.discountedShipping as boolean),
      };
      const languageList = [
        parsed.englishLanguageList,
        getDefaultItem(
          parsed.nepaliLanguageList,
          "ne_NP",
          parsed.englishLanguageList,
        ),
        getDefaultItem(
          parsed.vientameseLanguageList,
          "vi_VN",
          parsed.englishLanguageList,
        ),
        getDefaultItem(
          parsed.japaneseLanguageList,
          "ja_JP",
          parsed.englishLanguageList,
        ),
      ];
      const newImages: string[] = itemImages?.map((img) =>
        img.includes("temp")
          ? (img.split("/temp").pop()?.replace("/", "") ?? "")
          : img,
      );

      if (item && !!itemId) {
        const isSameImages =
          parsed.itemImages.length === item.itemImages.images.length &&
          parsed.itemImages.every(
            (value, index) => value === item.itemImages.images[index],
          );
        if (copyItem) {
          await copyMutation({
            itemId: itemId,
            data: {
              ...body,
              images: newImages,
              newImage: !isSameImages,
              languageList,
            },
          });
          return;
        }
        await updateMutation({
          itemId: itemId,
          body: {
            ...body,
            item_images: newImages,
            itemLanguageList: languageList,
          },
        });
        return;
      }
      addMutation({
        body: {
          ...body,
          images: newImages,
          languageList,
        },
      });
    },
  });

  const getDefaultItem = useCallback(
    (
      item: IItemLanguageList,
      lan: ILanguageCode,
      defaultItem: IItemLanguageList,
    ) => {
      const itemsBody = {
        languageCode: lan ?? "en_US",
        itemDescription: item.itemDescription || defaultItem.itemDescription,
        itemName: item.itemName || defaultItem.itemName,
        itemTags:
          item.itemTags?.length !== 0 ? item.itemTags : defaultItem.itemTags,
      };

      return itemsBody;
    },
    [],
  );

  const isPending = updatingItem || copyingItem || addingItem;

  return {
    Form,
    isPending,
  };
};
