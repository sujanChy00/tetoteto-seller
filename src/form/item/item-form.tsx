import { useGetAllCategories } from "@/components/ui/categories-query";
import { Chip } from "@/components/ui/chip";
import { Surface } from "@/components/ui/surface";
import { itemTypeOptions } from "@/constants/data";
import { withForm } from "@/hooks/use-form";
import { useLanguage } from "@/hooks/use-language";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import { useSelector } from "@tanstack/react-form";
import { useMemo } from "react";
import { View } from "react-native";
import { ItemFormInput } from "./item-schema";

interface Props {
  editMode?: boolean;
}

export const ItemForm = withForm({
  defaultValues: {} as ItemFormInput,
  props: {} as Props,
  render: ({ form: Form, editMode }) => {
    const { selectedShop, isSastoSulavSelected } = useSelectedShop();
    const { t } = useLanguage();
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

    const { categoryId } = useSelector(Form.store, (state) => ({
      categoryId: state.values.categoryId,
    }));
    const selectedCategory = useMemo(() => {
      return categories?.find(
        (category) => String(category.id ?? "") === categoryId,
      );
    }, [categories, categoryId]);

    return (
      <View className="gap-y-6">
        <Form.AppField
          name="price"
          children={(Field) => (
            <Field.TextField
              label={t("selling_price")}
              inputMode="decimal"
              keyboardType="decimal-pad"
            />
          )}
        />
        <Form.AppField
          name="markedPrice"
          validators={{
            onBlur: ({ fieldApi, value }) => {
              const price = fieldApi.form.getFieldValue("price");
              const weight = fieldApi.form.getFieldValue("weight");

              if (Number(value) > 0 && Number(value) < Number(price)) {
                return t("item_marked_price_less_than_price");
              }
              if (Number(weight) > 25) {
                return t("item_weight_error_message");
              }
            },
          }}
          children={(Field) => (
            <Field.TextField
              label={t("marked_price")}
              inputMode="decimal"
              keyboardType="decimal-pad"
            />
          )}
        />
        <Form.AppField
          name="weight"
          validators={{
            onBlur: ({ fieldApi, value }) => {
              const itemType = fieldApi.form.getFieldValue("type");

              switch (itemType) {
                case "cool":
                case "frozen":
                  if (Number(value) > selectedShop?.coolWeightLimit!) {
                    return `item weight limit is ${selectedShop?.coolWeightLimit}`;
                  }
                  break;
                case "dry":
                  if (Number(value) > selectedShop?.dryWeightLimit!) {
                    return `item weight limit is ${selectedShop?.dryWeightLimit}`;
                  }
                  break;
                default:
                  return undefined;
              }
            },
          }}
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
        {editMode && isSastoSulavSelected && (
          <Form.AppField
            name="indianShop"
            children={(Field) => (
              <Surface className="py-1">
                <Field.SwitchField
                  label={t("add_to_indian_shop")}
                  description="If toggled on it will be added to Indian Shop else it will be added to Nepali Shop"
                />
              </Surface>
            )}
          />
        )}
        <Form.AppField
          name="discountedShipping"
          children={(Field) => (
            <Surface className="py-1">
              <Field.SwitchField label={t("discounted_shipping")} />
            </Surface>
          )}
        />
        <Form.AppField
          name="canBeMerged"
          children={(Field) => (
            <Surface className="py-1">
              <Field.SwitchField label={t("can_be_sent_in_cool_cart")} />
            </Surface>
          )}
        />
      </View>
    );
  },
});
