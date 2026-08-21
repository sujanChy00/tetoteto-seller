import { Pressable, Text, View } from "react-native";

import type { PressableProps, TextProps, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { Separator } from "./separator";
import { StyledSymbolView } from "./symbol-view";

function ListGroupRoot(props: ViewProps) {
  return <View {...props} />;
}

function ListGroupHeader({ children, className, ...restProps }: ViewProps) {
  return (
    <View
      className={twMerge(
        "flex-row justify-between items-center mb-2",
        className,
      )}
      {...restProps}
    >
      {children}
    </View>
  );
}

function ListGroupHeaderTitle({
  children,
  className,
  ...restProps
}: TextProps) {
  return (
    <Text
      className={twMerge("text-sm text-muted font-medium", className)}
      {...restProps}
    >
      {children}
    </Text>
  );
}

const ListGroupBody = ({
  children,
  className,
  style,
  ...restProps
}: ViewProps) => {
  return (
    <View
      className={twMerge("bg-surface rounded-3xl shadow", className)}
      style={[
        style,
        {
          borderCurve: "continuous",
        },
      ]}
      {...restProps}
    >
      {children}
    </View>
  );
};

function ListGroupItem({ children, className, ...restProps }: PressableProps) {
  return (
    <Pressable
      className={twMerge("flex-row items-center gap-3 px-4 py-3.5", className)}
      {...restProps}
    >
      {children}
    </Pressable>
  );
}

function ListGroupItemTitle({ children, className, ...restProps }: TextProps) {
  return (
    <Text
      className={twMerge("text-base text-foreground font-medium", className)}
      {...restProps}
    >
      {children}
    </Text>
  );
}

function ListGroupItemSeparator({ className }: ViewProps) {
  return (
    <View className={twMerge("px-4", className)}>
      <Separator />
    </View>
  );
}

function ListGroupItemDescription({
  children,
  className,
  ...restProps
}: TextProps) {
  return (
    <Text className={twMerge("text-sm text-muted", className)} {...restProps}>
      {children}
    </Text>
  );
}

function ListGroupItemPrefix({ children, ...restProps }: ViewProps) {
  return <View {...restProps}>{children}</View>;
}

function ListGroupItemSuffix({
  children,
  iconSize = 16,
  ...restProps
}: ViewProps & { iconSize?: number }) {
  return (
    <View {...restProps}>
      {children ?? (
        <StyledSymbolView
          name={{
            android: "keyboard_arrow_right",
            ios: "chevron.right",
          }}
          size={iconSize}
          tintColorClassName="accent-muted"
        />
      )}
    </View>
  );
}

function ListGroupItemContent({
  children,
  className,
  ...restProps
}: ViewProps) {
  return (
    <View className={twMerge("flex-1", className)} {...restProps}>
      {children}
    </View>
  );
}

export const ListGroup = Object.assign(ListGroupRoot, {
  Item: ListGroupItem,
  ItemTitle: ListGroupItemTitle,
  ItemDescription: ListGroupItemDescription,
  ItemSuffix: ListGroupItemSuffix,
  ItemPrefix: ListGroupItemPrefix,
  Header: ListGroupHeader,
  HeaderTitle: ListGroupHeaderTitle,
  Body: ListGroupBody,
  ItemContent: ListGroupItemContent,
  ItemSeparator: ListGroupItemSeparator,
});
