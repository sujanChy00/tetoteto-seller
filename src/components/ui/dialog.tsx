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
import { Button } from "./button";
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
    >
      <View className="flex-1 items-center justify-center">{children}</View>
    </Modal>
  );
};

const Content = ({ children, isPending, className }: ModalContentProps) => {
  if (isPending)
    return (
      <Surface className="p-6 h-50 md:w-sm w-2xs rounded-4xl items-center justify-center">
        <ActivityIndicator size={50} />
      </Surface>
    );
  return (
    <Surface
      className={twMerge("p-6 md:w-sm w-2xs gap-y-6 rounded-4xl", className)}
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
    <Button.Ghost className={twMerge("px-6 h-10", className)} {...rest}>
      {children ?? <Button.GhostLabel>{t("cancel")}</Button.GhostLabel>}
    </Button.Ghost>
  );
};
const Action = ({
  className,
  variant,
  ...rest
}: PressableProps & { variant?: "danger" | "default" | "dangerSoft" }) => {
  if (variant === "danger") {
    return (
      <Button.Danger className={twMerge("px-6 h-10", className)} {...rest} />
    );
  }
  if (variant === "dangerSoft") {
    return (
      <Button.DangerSoft
        className={twMerge("px-6 h-10", className)}
        {...rest}
      />
    );
  }

  return <Button.Ghost className={twMerge("px-6 h-10", className)} {...rest} />;
};

export const Dialog = {
  Root,
  Close,
  Action,
  Title,
  Description,
  Header,
  Footer,
  Content,
};
