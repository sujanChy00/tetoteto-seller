import { Chip } from "@/components/ui/chip";
import { IOrderProgress } from "@/types";

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
