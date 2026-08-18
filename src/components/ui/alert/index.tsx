import { createContext, useContext, useMemo } from "react";
import { TextProps, View, ViewProps } from "react-native";
import { ThemedText } from "../themed-text";
import {
  alertStyleSheet,
  content,
  description as descriptionStyle,
  indicator,
  root,
  title,
} from "./alert-styles";
import { AlertStatus, getStatusIcon, useStatusColor } from "./alert-utils";

const DEFAULT_ICON_SIZE = 20;

// --------------------------------------------------
interface AlertContextValue {
  status: AlertStatus;
}

const AlertContext = createContext<AlertContextValue | null>(null);

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("Alert.* must be used within <Alert>");
  return ctx;
};

// --------------------------------------------------
interface AlertRootProps extends ViewProps {
  status?: AlertStatus;
}

const Root = ({
  children,
  status = "default",
  className,
  style,
  ...rest
}: AlertRootProps) => {
  const contextValue = useMemo(() => ({ status }), [status]);

  return (
    <AlertContext.Provider value={contextValue}>
      <View
        accessibilityRole="alert"
        className={root({ status, className })}
        style={[alertStyleSheet.root, style]}
        {...rest}
      >
        {children}
      </View>
    </AlertContext.Provider>
  );
};

// --------------------------------------------------
interface AlertIndicatorProps extends ViewProps {
  iconProps?: { size?: number; color?: string };
}

const Indicator = ({
  children,
  className,
  iconProps,
  ...rest
}: AlertIndicatorProps) => {
  const { status } = useAlert();
  const statusColor = useStatusColor(status);

  const resolvedIconProps = {
    size: iconProps?.size ?? DEFAULT_ICON_SIZE,
    color: iconProps?.color ?? statusColor,
  };

  return (
    <View className={indicator({ className })} {...rest}>
      {children ?? getStatusIcon(status, resolvedIconProps)}
    </View>
  );
};

// --------------------------------------------------
const Content = ({ children, className, ...rest }: ViewProps) => (
  <View className={content({ className })} {...rest}>
    {children}
  </View>
);

// --------------------------------------------------
const Title = ({ children, className, ...rest }: TextProps) => {
  const { status } = useAlert();
  return (
    <ThemedText className={title({ status, className })} {...rest}>
      {children}
    </ThemedText>
  );
};

// --------------------------------------------------
const Description = ({ children, className, ...rest }: TextProps) => (
  <ThemedText className={descriptionStyle({ className })} {...rest}>
    {children}
  </ThemedText>
);

// --------------------------------------------------
export const Alert = Object.assign(Root, {
  Indicator,
  Content,
  Title,
  Description,
});
