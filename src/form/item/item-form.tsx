import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { useGetAllCategories } from "@/components/ui/categories-query";
import { Chip } from "@/components/ui/chip";
import { Surface } from "@/components/ui/surface";
import { ThemedText } from "@/components/ui/themed-text";
import { itemTypeOptions } from "@/constants/data";
import { useForm } from "@/hooks/use-form";
import { useLanguage } from "@/hooks/use-language";
import { useSelectedShop } from "@/hooks/use-selected-shop";
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
import { useSelector } from "@tanstack/react-form";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { ActivityIndicator, View } from "react-native";
import { ItemImageSelector } from "./item-images-selector";
import { ItemFormInput, itemFormSchema } from "./item-schema";

interface Props {
  item?: IItemDescriptionResponse;
  copyItem?: boolean;
  canUpdateImage?: boolean;
  langName:
    | "englishLanguageList"
    | "japaneseLanguageList"
    | "nepaliLanguageList"
    | "vietnameseLanguageList";
}

export const ItemForm = ({
  item,
  copyItem,
  canUpdateImage = true,
  langName,
}: Props) => {
  const { selectedShop } = useSelectedShop();
  const { t } = useLanguage();
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const { data: categories } = useGetAllCategories();
  const categoriesOptions = useMemo(
    () =>
      categories
        ? categories.map((category) => ({
            label: `${category?.name} (${category?.tax || 0}% tax)`,
            value: String(category?.id),
          }))
        : [],
    [categories],
  );

  const router = useRouter();
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
    onSubmit: async ({ value, formApi }) => {
      if (value.type == "cool" || value.type == "frozen") {
        if (Number(value.weight) > selectedShop?.coolWeightLimit!) {
          formApi.setFieldMeta("weight", (prev) => ({
            ...prev,
            errorMap: {
              ...prev.errorMap,
              onSubmit: `item weight limit is ${selectedShop?.coolWeightLimit}`,
            },
          }));

          return;
        }
      }
      if (value.type == "dry") {
        if (Number(value.weight) > selectedShop?.dryWeightLimit!) {
          formApi.setFieldMeta("weight", (prev) => ({
            ...prev,
            errorMap: {
              ...prev.errorMap,
              onSubmit: `item weight limit is ${selectedShop?.dryWeightLimit}`,
            },
          }));
          return;
        }
      }
      // // if (uploadingPackageImage || uploadingItemImage) {
      // //   errorToast(getText('package_image_uploading_message'));
      // //   return;
      // // }
      if (
        Number(value.markedPrice) > 0 &&
        Number(value.markedPrice) < Number(value.price)
      ) {
        formApi.setFieldMeta("markedPrice", (prev) => ({
          ...prev,
          errorMap: {
            ...prev.errorMap,
            onSubmit: t("item_marked_price_less_than_price"),
          },
        }));

        return;
      }
      if (Number(value.weight) > 25) {
        formApi.setFieldMeta("markedPrice", (prev) => ({
          ...prev,
          errorMap: {
            ...prev.errorMap,
            onSubmit: t("item_weight_error_message"),
          },
        }));
        return;
      }
      if (value.discountedShipping && Number(value.weight) > 2) {
        errorToast({
          title: t("discounted_shipping_error_message"),
        });
        return;
      }
      const body = {
        ...value,
        manufactureDate: formatDate(value.manufactureDate),
        expiryDate: formatDate(value.expiryDate),
        categoryId: Number(value.categoryId),
        weight: Number(value.weight),
        canBeMerged:
          value.type === "cool" ? false : (value.canBeMerged as boolean),
        markedPrice: Number(value.markedPrice),
        price: Number(value.price),
        stock: Number(value.stock),
        discountedShipping:
          value.type !== "dry" ? false : (value.discountedShipping as boolean),
      };
      const languageList = [
        value.englishLanguageList,
        getDefaultItem(value.nepaliLanguageList, "ne_NP"),
        getDefaultItem(value.vientameseLanguageList, "vi_VN"),
        getDefaultItem(value.japaneseLanguageList, "ja_JP"),
      ];
      const itemImages: string[] = value.itemImages?.map((img) =>
        img.includes("temp")
          ? (img.split("/temp").pop()?.replace("/", "") ?? "")
          : img,
      );

      if (item && !!itemId) {
        const isSameImages =
          value.itemImages.length === item.itemImages.images.length &&
          value.itemImages.every(
            (value, index) => value === item.itemImages.images[index],
          );
        if (copyItem) {
          await copyMutation({
            itemId: itemId,
            data: {
              ...body,
              images: itemImages,
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
            item_images: itemImages,
            itemLanguageList: languageList,
          },
        });
        return;
      }
      addMutation({
        body: {
          ...body,
          images: itemImages,
          languageList,
        },
      });
    },
  });

  const { categoryId, englishItems } = useSelector(Form.store, (state) => ({
    categoryId: state.values.categoryId,
    englishItems: state.values.englishLanguageList,
  }));
  const selectedCategory = useMemo(() => {
    return categories?.find(
      (category) => String(category.id ?? "") === categoryId,
    );
  }, [categories, categoryId]);

  const getDefaultItem = useCallback(
    (item: IItemLanguageList, lan: ILanguageCode) => {
      const itemsBody = {
        languageCode: lan ?? "en_US",
        itemDescription: item.itemDescription || englishItems.itemDescription,
        itemName: item.itemName || englishItems.itemName,
        itemTags:
          item.itemTags?.length !== 0 ? item.itemTags : englishItems.itemTags,
      };

      return itemsBody;
    },
    [],
  );

  const isPending = updatingItem || copyingItem || addingItem;

  return (
    <Form.AppForm>
      <View className="gap-y-6 px-4">
        {canUpdateImage && (
          <Form.AppField
            name="itemImages"
            children={(Field) => (
              <ItemImageSelector
                value={Field.state.value}
                onChange={Field.handleChange}
              />
            )}
          />
        )}
        <Form.AppField
          name={`${langName}.itemName` as keyof ItemFormInput}
          children={(Field) => <Field.TextField label={t("name")} />}
        />
        <Form.AppField
          name={`${langName}.itemTags` as keyof ItemFormInput}
          children={(Field) => (
            <Field.TextField
              label={t("item_tags")}
              multiline
              placeholder={t("enter_item_tags")}
            />
          )}
        />
        <Form.AppField
          name={`${langName}.itemDescription` as keyof ItemFormInput}
          children={(Field) => (
            <Field.TextField multiline label={t("item_description")} />
          )}
        />
        <Form.AppField
          name="price"
          children={(Field) => (
            <Field.TextField
              label={t("selling_price")}
              inputMode="numeric"
              keyboardType="numeric"
            />
          )}
        />
        <Form.AppField
          name="markedPrice"
          children={(Field) => (
            <Field.TextField
              label={t("marked_price")}
              inputMode="numeric"
              keyboardType="numeric"
            />
          )}
        />
        <Form.AppField
          name="weight"
          children={(Field) => (
            <Field.TextField
              label={t("item_weight")}
              inputMode="decimal"
              keyboardType="decimal-pad"
            />
          )}
        />
        <Form.AppField
          name="stock"
          children={(Field) => (
            <Field.TextField
              label={t("item_stock")}
              inputMode="numeric"
              keyboardType="numeric"
            />
          )}
        />
        <Form.AppField
          name="sku"
          children={(Field) => <Field.TextField label={t("sku")} />}
        />
        <Form.AppField
          name="type"
          children={(Field) => (
            <Field.SelectField
              options={itemTypeOptions}
              onValueChange={(e) => {
                switch (e) {
                  case "cool":
                    Form.setFieldValue("canBeMerged", true);
                    break;
                  case "dry":
                    Form.setFieldValue("discountedShipping", false);
                    break;
                }
              }}
              label={t("item_type")}
            />
          )}
        />
        <View className="relative">
          {selectedCategory && (
            <View className="absolute right-2 z-10 flex-row items-center gap-1 top-3.5">
              {!!selectedCategory.maxQuantityAllowed && (
                <Chip size="sm" color="warning">
                  <Chip.Label>
                    {t("max_quantity")}
                    {selectedCategory?.maxQuantityAllowed}
                  </Chip.Label>
                </Chip>
              )}
              {selectedCategory.alcohol && (
                <Chip size="sm" variant="soft" color="danger">
                  <Chip.Label>{t("alcohol")}</Chip.Label>
                </Chip>
              )}
            </View>
          )}
          <Form.AppField
            name="categoryId"
            children={(Field) => (
              <Field.SelectField
                snapPoints={["50%", "100%"]}
                options={categoriesOptions}
                label={t("category")}
              />
            )}
          />
        </View>
        <Form.AppField
          name="manufactureDate"
          children={(Field) => (
            <Field.DateField
              label={t("manufacture_date")}
              maximumDate={new Date()}
            />
          )}
        />
        <Form.AppField
          name="expiryDate"
          children={(Field) => (
            <Field.DateField
              label={t("expiry_date")}
              minimumDate={new Date()}
            />
          )}
        />
        <Form.AppField
          name="indianShop"
          children={(Field) => (
            <Surface>
              <Field.SwitchField label={t("add_to_indian_shop")} />
            </Surface>
          )}
        />
        <Form.AppField
          name="discountedShipping"
          children={(Field) => (
            <Surface>
              <Field.SwitchField label={t("discounted_shipping")} />
            </Surface>
          )}
        />
        <Form.AppField
          name="canBeMerged"
          children={(Field) => (
            <Surface>
              <Field.SwitchField label={t("can_be_sent_in_cool_cart")} />
            </Surface>
          )}
        />
        <Form.SubmitButton disabled={isPending}>
          {isPending && (
            <ActivityIndicator
              size={"small"}
              colorClassName="accent-primary-foreground"
            />
          )}
          <ThemedText className="text-primary-foreground">
            {t(copyItem ? "copy" : "save")}
          </ThemedText>
        </Form.SubmitButton>
        <AnimatedSpacer height={100} />
      </View>
    </Form.AppForm>
  );
};
