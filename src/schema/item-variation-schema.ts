import * as v from "valibot";

export const ItemVariationSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, "Name is required")),
  price: v.pipe(v.string(), v.minLength(1, "Price is required")),
  weight: v.pipe(v.string(), v.minLength(1, "Weight is required")),
  stock: v.number("Stock is required"),
});

export type ItemVariationValues = v.InferOutput<typeof ItemVariationSchema>;
