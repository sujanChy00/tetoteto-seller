import { StyleSheet } from "react-native";
import { tv } from "tailwind-variants";

export const root = tv({
  base: "p-3 flex-row gap-3 rounded-3xl bg-surface shadow",
  variants: {
    status: {
      default: "",
      primary: "border-primary border",
      success: "border-success border",
      warning: "border-warning border",
      danger: "border-danger border",
    },
  },
  defaultVariants: { status: "default" },
});

export const indicator = tv({
  base: "pt-[3.5px]",
});

export const content = tv({
  base: "flex-1",
});

export const title = tv({
  base: "text-base font-medium",
  variants: {
    status: {
      default: "text-foreground",
      primary: "text-primary",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
    },
  },
  defaultVariants: { status: "default" },
});

export const description = tv({
  base: "text-sm text-muted",
});

export const alertStyleSheet = StyleSheet.create({
  root: { borderCurve: "continuous" },
});
