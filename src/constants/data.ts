import { ILanguageCode, ILanguageTexts } from "@/types";

export const SASTO_SULAV_NEPAL = 2586825067;
export const SASTO_SULAV_iNDIA = 2863768825;

export const LanguageLists: { label: string; value: ILanguageCode }[] = [
  {
    label: "English",
    value: "en_US",
  },
  {
    label: "Nepali",
    value: "ne_NP",
  },
  {
    label: "Vietnamese",
    value: "vi_VN",
  },
  {
    label: "Japanese",
    value: "ja_JP",
  },
];

export const orderSortOptions: { label: ILanguageTexts; value: string }[] = [
  { label: "all", value: "all" },
  { label: "pending_change", value: "PENDING_CHANGE" },
  { label: "wait_payment", value: "WAITING_FOR_PAYMENT" },
  { label: "order_placed", value: "ORDER_PLACED" },
  { label: "shipped", value: "SHIPPED" },
  { label: "cancelled", value: "CANCELLED" },
  { label: "processing", value: "PROCESSING" },
  { label: "completed", value: "COMPLETED" },
];

export const itemTypeOptions = [
  {
    label: "Dry",
    value: "dry",
  },

  {
    label: "Frozen",
    value: "frozen",
  },

  {
    label: "Cool",
    value: "cool",
  },
];

export const discountTypes = [
  {
    value: "shippingCampaignDiscountPercentage",
    label: "Percentage",
  },
  {
    value: "flatShippingCharge",
    label: "Flat Amount",
  },
  {
    value: "flatShippingDiscount",
    label: "Flat Discount",
  },
];

export const itemTypes = [
  {
    label: "All",
    value: "ASHA_ALL",
  },
  {
    label: "Dry",
    value: "ASHA_DRY",
  },

  {
    label: "Frozen",
    value: "ASHA_FROZEN",
  },

  {
    label: "Cool",
    value: "ASHA_COOL",
  },
];

export const shipmentFilterOptions = [
  {
    label: "Active",
    value: "current",
  },
  {
    label: "All",
    value: "all",
  },
];
