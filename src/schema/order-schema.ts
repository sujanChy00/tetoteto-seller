import * as v from "valibot";

export const ShippingAddressSchema = v.object({
  address1: v.pipe(v.string(), v.minLength(1, "Address 1 is required")),
  address2: v.optional(v.string()),
  city: v.pipe(v.string(), v.minLength(1, "City is required")),
  postalCode: v.pipe(
    v.string(),
    v.minLength(1, "Postal Code is required"),
    v.maxLength(7, "Postal Code is too long"),
  ),
  prefecture: v.string(),
});

export const ShipOrderSchema = v.pipe(
  v.object({
    trackingNumber: v.pipe(
      v.string("Tracking number is required"),
      v.minLength(1, "Tracking number is required"),
      v.regex(/^\d+$/, "Tracking number must contain only digits"),
      v.minLength(10, "Tracking no. must be between 10 and 14 digits"),
      v.maxLength(14, "Tracking no. must be between 10 and 14 digits"),
    ),
    trackingUrl: v.optional(v.string()),
    shippingCompany: v.optional(v.number()),
  }),
  v.forward(
    v.check(
      (data) => data.shippingCompany !== 0 || !!data.trackingUrl,
      "Tracking URL is required",
    ),
    ["trackingUrl"],
  ),
);

export type ShipOrderFormValues = v.InferOutput<typeof ShipOrderSchema>;
export type ShippingAddressFormValues = v.InferOutput<
  typeof ShippingAddressSchema
>;
