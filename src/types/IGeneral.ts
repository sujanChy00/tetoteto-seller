import { ILanguageTexts } from "./ILanguageTexts";

export interface PreferredCountry {
  id: number;
  name: string;
  code: string;
  status: boolean;
  value: string;
  createdAt: number;
  updatedAt: number;
}

export interface IShippingArea {
  shippingAreaId: number;
  shippingArea: string;
  shippingPrefectures: unknown[];
  shippingActive: boolean;
}
export interface IGeneralResponse {
  status: string;
  message: string;
  error?: {
    [key in string]: any;
  };
  data?: {
    [key in string]: any;
  };
}

export enum IShopCountry {
  IN = "IN",
  NP = "NP",
  VN = "VN",
  PK = "PK",
}

export interface ItemSortOption {
  label: ILanguageTexts;
  value: string;
}

export class BiometricLoginError extends Error {
  code: string;
  constructor(code: string) {
    super(code);
    this.code = code;
  }
}

export type mutationProps<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
};
