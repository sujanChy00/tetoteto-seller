import * as v from "valibot";

export const ShopSchema = v.object({
  shopAddress: v.pipe(v.string(), v.minLength(1, "Shop address is required")),
  shopName: v.pipe(v.string(), v.minLength(1, "Shop name is required")),
  shopPhoneNumber: v.pipe(
    v.string(),
    v.minLength(1, "Shop phone number is required"),
  ),
  shopPostalCode: v.pipe(
    v.string(),
    v.minLength(1, "Shop postal code is required"),
  ),
  orderAmount: v.number("Order amount is required"),
  shopIntroduction: v.optional(v.string()),
  shopRegistrationNumber: v.optional(v.string()),
  shopFacebookUrl: v.optional(v.string()),
  shopTiktokUrl: v.optional(v.string()),
  lowStockThreshold: v.number("Threshold is required"),
  expiryThreshold: v.number("Threshold is required"),
});

export type ShopFormValues = v.InferOutput<typeof ShopSchema>;
