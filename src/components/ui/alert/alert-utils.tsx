import { useCSSVariable } from "uniwind";
import { DefaultIcon, SuccessIcon, WarningIcon } from "./alert-icon";

export type AlertStatus =
  "default" | "primary" | "success" | "warning" | "danger";

interface AlertIconProps {
  size?: number;
  color?: string;
}

// Matches the original: DefaultIcon covers default/primary/danger,
// only success and warning get their own dedicated icon.
export const getStatusIcon = (
  status: AlertStatus,
  iconProps: AlertIconProps,
) => {
  switch (status) {
    case "success":
      return <SuccessIcon {...iconProps} />;
    case "warning":
      return <WarningIcon {...iconProps} />;
    default:
      return <DefaultIcon {...iconProps} />;
  }
};

export const useStatusColor = (status: AlertStatus) => {
  const [primary, success, warning, danger, foreground] = useCSSVariable([
    "--color-primary",
    "--color-success",
    "--color-warning",
    "--color-danger",
    "--color-foreground",
  ]);

  switch (status) {
    case "primary":
      return primary as string;
    case "success":
      return success as string;
    case "warning":
      return warning as string;
    case "danger":
      return danger as string;
    default:
      return foreground as string;
  }
};
