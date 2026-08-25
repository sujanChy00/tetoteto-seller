import { numericField } from "@/utils/number-converter-schema";
import * as v from "valibot";

export const ItemVariationSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, "Name is Required")),
  price: numericField("Weight", 1),
  weight: numericField("Weight", 0.001),
  stock: numericField("Stock", 1),
});

export type ItemVariationInput = v.InferInput<typeof ItemVariationSchema>;
export type ItemVariationValues = v.InferOutput<typeof ItemVariationSchema>;
