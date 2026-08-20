import { Chip } from "@/components/ui/chip";
import { StyledSymbolView } from "@/components/ui/symbol-view";
import { IOrderProgress } from "@/types";
import { JSX } from "react/jsx-runtime";

export const orderStatusColor: Record<
  IOrderProgress,
  React.ComponentProps<typeof Chip>["color"]
> = {
  WAITING_FOR_PAYMENT: "warning",
  COMPLETED: "success",
  CANCELLED_BY_ADMIN: "danger",
  CANCELLED_BY_CUSTOMER: "danger",
  PAYMENT_FAILED: "danger",
  PENDING_CHANGE: "warning",
  ORDER_PLACED: "primary",
  SELLER_ACKNOWLEDGED: "success",
  SHIPPED: "default",
};

export const orderStatusTextColor: Record<string, string> = {
  PENDING_CHANGE: "text-foreground",
  WAITING_FOR_PAYMENT: "text-warning",
  SHIPPED: "text-foreground",
  ORDER_PLACED: "text-primary",
  CANCELLED: "text-danger",
  COMPLETED: "text-success",
  PROCESSING: "text-foreground",
};

export const transactionTypeColor: Record<
  string,
  React.ComponentProps<typeof Chip>["color"]
> = {
  cool: "success",
  dry: "warning",
  frozen: "primary",
};

export const transactionTypeIcon: Record<string, JSX.Element> = {
  cool: (
    <StyledSymbolView
      tintColorClassName={"accent-success"}
      name={{
        android: "thermostat",
        ios: "thermometer.high",
      }}
      size={12}
    />
  ),
  dry: (
    <StyledSymbolView
      tintColorClassName={"accent-warning"}
      name={{
        android: "local_fire_department",
        ios: "flame.fill",
      }}
      size={12}
    />
  ),
  frozen: (
    <StyledSymbolView
      tintColorClassName={"accent-primary"}
      name={{
        android: "ac_unit",
        ios: "snowflake",
      }}
      size={12}
    />
  ),
};
