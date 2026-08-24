import { ILanguageCode } from "@/types";
import {
  numericField,
  optionalNumericField,
} from "@/utils/number-converter-schema";
import * as v from "valibot";

const ItemListSchema = <Lan extends ILanguageCode>(lan: Lan) => {
  return v.object({
    languageCode: v.literal(lan),
    itemDescription: v.string(),
    itemName: v.string(),
    itemTags: v.string(),
  });
};

export const itemFormSchema = v.object({
  itemImages: v.array(v.string()),
  stock: optionalNumericField(),
  canBeMerged: v.boolean(),
  type: v.picklist(["dry", "frozen", "cool"]),
  weight: numericField("Weight is required", 1),
  markedPrice: optionalNumericField(),
  price: numericField("Price is required", 1),
  sku: v.string(),
  manufactureDate: v.date("Manufacture date is required"),
  expiryDate: v.date("Expiry date is required"),
  categoryId: v.pipe(v.string(), v.minLength(1, "Category is required")),
  indianShop: v.boolean(),
  englishLanguageList: v.object({
    languageCode: v.literal("en_US"),
    itemDescription: v.pipe(
      v.string(),
      v.minLength(1, "Description is required"),
    ),
    itemName: v.pipe(v.string(), v.minLength(1, "Name is required")),
    itemTags: v.string(),
  }),
  nepaliLanguageList: ItemListSchema("ne_NP"),
  japaneseLanguageList: ItemListSchema("ja_JP"),
  vientameseLanguageList: ItemListSchema("vi_VN"),
  discountedShipping: v.boolean(),
});
export type ItemFormInput = v.InferInput<typeof itemFormSchema>;
export type ItemFormValues = v.InferOutput<typeof itemFormSchema>;
