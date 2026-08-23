import { useLanguage } from "@/hooks/use-language";
import {
  ActivityIndicator,
  Modal,
  PressableProps,
  TextProps,
  View,
  ViewProps,
} from "react-native";
import { twMerge } from "tailwind-merge";
import { useCSSVariable } from "uniwind";
import {
  DangerButton,
  DangerSoftButton,
  GhostButton,
  PrimaryButton,
} from "./button";
import { Surface } from "./surface";
import { ThemedText } from "./themed-text";

interface DialogRootProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

interface ModalContentProps {
  children: React.ReactNode;
  isPending?: boolean;
  className?: string;
}

export const Root = ({ children, isOpen, onClose }: DialogRootProps) => {
  const [backdropColor] = useCSSVariable(["--color-backdrop"]);
  return (
    <Modal
      backdropColor={backdropColor as string}
      visible={isOpen}
      onRequestClose={onClose}
      allowSwipeDismissal
      animationType="fade"
    >
      <View className="flex-1 items-center justify-center">{children}</View>
    </Modal>
  );
};

const Content = ({ children, isPending, className }: ModalContentProps) => {
  if (isPending)
    return (
      <Surface className="p-6 h-50 w-[90vw] rounded-4xl items-center justify-center overflow-hidden">
        <ActivityIndicator size={50} />
      </Surface>
    );
  return (
    <Surface
      className={twMerge(
        "p-6 w-[90vw] gap-y-6 rounded-4xl overflow-hidden",
        className,
      )}
    >
      {children}
    </Surface>
  );
};

const Title = ({ className, ...rest }: TextProps) => (
  <ThemedText className={twMerge("font-medium", className)} {...rest} />
);
const Description = ({ className, ...rest }: TextProps) => (
  <ThemedText className={twMerge("text-muted", className)} {...rest} />
);

const Header = ({ className, ...rest }: ViewProps) => (
  <View className={twMerge("gap-y-1.5", className)} {...rest} />
);
const Footer = ({ className, ...rest }: ViewProps) => (
  <View
    className={twMerge("flex-row gap-1 justify-end items-center", className)}
    {...rest}
  />
);

const Close = ({ className, children, ...rest }: PressableProps) => {
  const { t } = useLanguage();
  return (
    <GhostButton className={twMerge("px-6", className)} {...rest}>
      {children ?? <GhostButton.Label>{t("cancel")}</GhostButton.Label>}
    </GhostButton>
  );
};

const Action = ({
  className,
  variant,
  ...rest
}: PressableProps & { variant?: "danger" | "default" | "dangerSoft" }) => {
  if (variant === "danger") {
    return <DangerButton className={twMerge("px-6", className)} {...rest} />;
  }
  if (variant === "dangerSoft") {
    return (
      <DangerSoftButton className={twMerge("px-6", className)} {...rest} />
    );
  }

  return <PrimaryButton className={twMerge("px-6", className)} {...rest} />;
};
const ActionLabel = ({
  variant,
  ...rest
}: TextProps & { variant?: "danger" | "default" | "dangerSoft" }) => {
  if (variant === "danger") {
    return <DangerButton.Label {...rest} />;
  }
  if (variant === "dangerSoft") {
    return <DangerSoftButton.Label {...rest} />;
  }

  return <PrimaryButton.Label {...rest} />;
};

export const Dialog = Object.assign(Root, {
  Close,
  Action,
  Title,
  Description,
  Header,
  Footer,
  Content,
  ActionLabel,
});
