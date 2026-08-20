import * as v from "valibot";
import { numericField, optionalNumericField } from "./number-converter-schema";

export const ShippingCampaignSchema = v.object({
  shippingCampaignStartDate: v.date("Start date required"),
  shippingCampaignEndDate: v.date("End date required"),
  shippingCampaignName: v.pipe(v.string(), v.minLength(1, "Name is required")),
  shippingCampaignDescription: v.pipe(
    v.string(),
    v.minLength(1, "Description is required"),
  ),
  shippingCampaignMinimumOrderAmountThreshold: numericField("Threshold AMT."),
  shippingCampaignActive: v.boolean(),
  shippingAreas: v.array(v.number()),
  shippingCampaignType: v.picklist(
    ["ASHA_ALL", "ASHA_DRY", "ASHA_FROZEN", "ASHA_COOL"],
    "Shipping campaign type is required",
  ),
  shippingCampaignDiscountPercentage: optionalNumericField(),
  flatShippingDiscount: optionalNumericField(),
  flatShippingCharge: optionalNumericField(),
  shippingCampaignGivenBy: v.pipe(
    v.string(),
    v.nonEmpty("Given by is required"),
  ),
  discountType: v.picklist([
    "shippingCampaignDiscountPercentage",
    "flatShippingCharge",
    "flatShippingDiscount",
  ]),
});

export type ShippingCampaignFormInput = v.InferInput<
  typeof ShippingCampaignSchema
>;
export type ShippingCampaignFormValues = v.InferOutput<
  typeof ShippingCampaignSchema
>;
