import { Pressable, PressableProps, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { ThemedText } from "./themed-text";

const SecondaryRoot = ({
  className,
  disabled = false,
  ...props
}: PressableProps) => {
  return (
    <Pressable
      className={twMerge(
        "bg-default flex-row items-center justify-center h-12 px-4 gap-2 rounded-3xl",
        disabled && "opacity-50",
        className,
      )}
      disabled={disabled}
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
const PrimaryRoot = ({
  className,
  disabled = false,
  ...props
}: PressableProps) => {
  return (
    <Pressable
      className={twMerge(
        "bg-primary flex-row items-center justify-center h-12 px-4 gap-2 rounded-3xl",
        disabled && "opacity-50",
        className,
      )}
      disabled={disabled}
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

const DangerRoot = ({
  className,
  disabled = false,
  ...props
}: PressableProps) => {
  return (
    <Pressable
      className={twMerge(
        "bg-danger flex-row items-center justify-center h-12 px-4 gap-2 rounded-3xl",
        disabled && "opacity-50",
        className,
      )}
      disabled={disabled}
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
const DangerGhostRoot = ({
  className,
  disabled = false,
  ...props
}: PressableProps) => {
  return (
    <Pressable
      className={twMerge(
        "bg-transparent flex-row items-center justify-center h-12 px-4 gap-2 rounded-3xl",
        disabled && "opacity-50",
        className,
      )}
      disabled={disabled}
      {...props}
    />
  );
};

const DangerGhostLabel = ({ className, ...props }: TextProps) => {
  return (
    <ThemedText
      className={twMerge("text-danger font-medium", className)}
      {...props}
    />
  );
};

const DangerSoftRoot = ({
  className,
  disabled = false,
  ...props
}: PressableProps) => {
  return (
    <Pressable
      className={twMerge(
        "bg-danger-soft flex-row items-center justify-center h-12 px-4 gap-2 rounded-3xl",
        disabled && "opacity-50",
        className,
      )}
      disabled={disabled}
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

const TertiaryRoot = ({
  className,
  disabled = false,
  ...props
}: PressableProps) => {
  return (
    <Pressable
      className={twMerge(
        "bg-default flex-row items-center justify-center h-12 px-4 gap-2 rounded-3xl",
        disabled && "opacity-50",
        className,
      )}
      disabled={disabled}
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

const GhostRoot = ({
  className,
  disabled = false,
  ...props
}: PressableProps) => {
  return (
    <Pressable
      className={twMerge(
        "bg-transparent flex-row items-center justify-center h-12 px-4 gap-2 rounded-3xl",
        disabled && "opacity-50",
        className,
      )}
      disabled={disabled}
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

const OutlineRoot = ({
  className,
  disabled = false,
  ...props
}: PressableProps) => {
  return (
    <Pressable
      className={twMerge(
        "bg-transparent border border-border flex-row items-center justify-center h-12 px-4 gap-2 rounded-3xl",
        disabled && "opacity-50",
        className,
      )}
      disabled={disabled}
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

export const PrimaryButton = Object.assign(PrimaryRoot, {
  Label: PrimaryLabel,
});
export const SecondaryButton = Object.assign(SecondaryRoot, {
  Label: SecondaryLabel,
});
export const TertiaryButton = Object.assign(TertiaryRoot, {
  Label: TertiaryLabel,
});
export const GhostButton = Object.assign(GhostRoot, {
  Label: GhostLabel,
});
export const OutlineButton = Object.assign(OutlineRoot, {
  Label: OutlineLabel,
});

export const DangerButton = Object.assign(DangerRoot, {
  Label: DangerLabel,
});
export const DangerSoftButton = Object.assign(DangerSoftRoot, {
  Label: DangerSoftLabel,
});

export const DangerGhostButton = Object.assign(DangerGhostRoot, {
  Label: DangerGhostLabel,
});
