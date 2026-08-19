import * as v from "valibot";
import { numericField, optionalNumericField } from "./number-converter-schema";

export const ShippingFeeSchema = v.object({
  coolShippingFee: numericField("Cool shipping fee"),
  frozenShippingFee: numericField("Frozen shipping fee"),
  shippingFee: numericField("Shipping fee"),
  weight: numericField("Weight"),
  fromAreaCode: optionalNumericField(),
  toAreaCode: optionalNumericField(),
  feeWithTax: numericField("Fee with tax"),
});

export type ShippingFeeFormInput = v.InferInput<typeof ShippingFeeSchema>;
export type ShippingFeeFormValues = v.InferOutput<typeof ShippingFeeSchema>;
