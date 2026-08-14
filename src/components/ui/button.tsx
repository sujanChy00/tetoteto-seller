import { Pressable, PressableProps, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { ThemedText } from "./themed-text";

const Secondary = ({ className, ...props }: PressableProps) => {
  return (
    <Pressable
      className={twMerge(
        "bg-default flex-row items-center justify-center h-12 px-4 gap-2 rounded-3xl",
        className,
      )}
      {...props}
    />
  );
};

const SecondaryLabel = ({ className, ...props }: TextProps) => {
  return (
    <ThemedText
      className={twMerge("text-primary font-medium", className)}
      {...props}
    />
  );
};
const Primary = ({ className, ...props }: PressableProps) => {
  return (
    <Pressable
      className={twMerge(
        "bg-primary flex-row items-center justify-center h-12 px-4 gap-2 rounded-3xl",
        className,
      )}
      {...props}
    />
  );
};

const PrimaryLabel = ({ className, ...props }: TextProps) => {
  return (
    <ThemedText
      className={twMerge("text-primary-foreground font-medium", className)}
      {...props}
    />
  );
};

const Danger = ({ className, ...props }: PressableProps) => {
  return (
    <Pressable
      className={twMerge(
        "bg-danger flex-row items-center justify-center h-12 px-4 gap-2 rounded-3xl",
        className,
      )}
      {...props}
    />
  );
};

const DangerLabel = ({ className, ...props }: TextProps) => {
  return (
    <ThemedText
      className={twMerge("text-danger-foreground font-medium", className)}
      {...props}
    />
  );
};

const DangerSoft = ({ className, ...props }: PressableProps) => {
  return (
    <Pressable
      className={twMerge(
        "bg-danger-soft flex-row items-center justify-center h-12 px-4 gap-2 rounded-3xl",
        className,
      )}
      {...props}
    />
  );
};

const DangerSoftLabel = ({ className, ...props }: TextProps) => {
  return (
    <ThemedText
      className={twMerge("text-danger font-medium", className)}
      {...props}
    />
  );
};

const Tertiary = ({ className, ...props }: PressableProps) => {
  return (
    <Pressable
      className={twMerge(
        "bg-default flex-row items-center justify-center h-12 px-4 gap-2 rounded-3xl",
        className,
      )}
      {...props}
    />
  );
};

const TertiaryLabel = ({ className, ...props }: TextProps) => {
  return (
    <ThemedText
      className={twMerge("text-default-foreground font-medium", className)}
      {...props}
    />
  );
};

const Ghost = ({ className, ...props }: PressableProps) => {
  return (
    <Pressable
      className={twMerge(
        "bg-transparent flex-row items-center justify-center h-12 px-4 gap-2 rounded-3xl",
        className,
      )}
      {...props}
    />
  );
};

const GhostLabel = ({ className, ...props }: TextProps) => {
  return (
    <ThemedText
      className={twMerge("text-primary font-medium", className)}
      {...props}
    />
  );
};

const Outline = ({ className, ...props }: PressableProps) => {
  return (
    <Pressable
      className={twMerge(
        "bg-transparent border border-border flex-row items-center justify-center h-12 px-4 gap-2 rounded-3xl",
        className,
      )}
      {...props}
    />
  );
};

const OutlineLabel = ({ className, ...props }: TextProps) => {
  return (
    <ThemedText
      className={twMerge("text-default-foreground font-medium", className)}
      {...props}
    />
  );
};

export const Button = {
  Secondary,
  SecondaryLabel,
  Primary,
  PrimaryLabel,
  Danger,
  DangerLabel,
  DangerSoft,
  DangerSoftLabel,
  Tertiary,
  TertiaryLabel,
  Ghost,
  GhostLabel,
  Outline,
  OutlineLabel,
};
