import * as v from "valibot";

export const ShippingCampaignSchema = v.object({
  shippingCampaignStartDate: v.date("Start date required"),
  shippingCampaignEndDate: v.date("End date required"),
  shippingCampaignName: v.pipe(v.string(), v.minLength(1, "Name is required")),
  shippingCampaignDescription: v.pipe(
    v.string(),
    v.minLength(1, "Description is required"),
  ),
  shippingCampaignMinimumOrderAmountThreshold: v.number(
    "Threshold AMT. is required",
  ),
  shippingCampaignActive: v.boolean(),
  shippingAreas: v.optional(v.array(v.number())),
  shippingCampaignType: v.picklist([
    "ASHA_ALL",
    "ASHA_DRY",
    "ASHA_FROZEN",
    "ASHA_COOL",
  ]),
  shippingCampaignDiscountPercentage: v.optional(v.number()),
  flatShippingDiscount: v.optional(v.number()),
  flatShippingCharge: v.optional(v.number()),
  shippingCampaignGivenBy: v.string("Given by is required"),
  discountType: v.picklist([
    "shippingCampaignDiscountPercentage",
    "flatShippingCharge",
    "flatShippingDiscount",
  ]),
});

export type ShippingCampaignFormData = v.InferInput<
  typeof ShippingCampaignSchema
>;
