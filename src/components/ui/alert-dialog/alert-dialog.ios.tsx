import { useLanguage } from "@/hooks/use-language";
import { AlertDialogProps } from "@/types/components";
import { Alert, Button, HStack, ProgressView, Text } from "@expo/ui/swift-ui";
import {
  Animation,
  animation,
  disabled,
  frame,
} from "@expo/ui/swift-ui/modifiers";
import { useState } from "react";

export function AlertDialog({
  title,
  message,
  trigger,
  onConfirm,
  cancelButtonText,
  confirmButtonRole,
  confirmButtonText,
  isConfirming = false,
}: AlertDialogProps) {
  const { t } = useLanguage();
  const [isPresented, setIsPresented] = useState(false);
  const open = () => setIsPresented(true);

  return (
    <Alert
      title={title}
      isPresented={isPresented}
      onIsPresentedChange={setIsPresented}
    >
      <Alert.Trigger>{trigger(open)}</Alert.Trigger>
      <Alert.Actions>
        <Button
          modifiers={isConfirming ? [disabled(true)] : []}
          label={t(cancelButtonText ?? "cancel")}
          onPress={() => {
            setIsPresented(false);
          }}
        />
        <Button
          modifiers={[
            ...(isConfirming ? [disabled(true)] : []),
            ...(isConfirming ? [frame({ maxWidth: Infinity })] : []),
            animation(Animation.spring({ duration: 0.4 }), isConfirming),
          ]}
          role={confirmButtonRole ?? "destructive"}
          onPress={() => {
            onConfirm();
            setIsPresented(false);
          }}
        >
          <HStack alignment="center" spacing={4}>
            <ProgressView />
            <Text>{t(confirmButtonText ?? "confirm")}</Text>
          </HStack>
        </Button>
      </Alert.Actions>
      {message && (
        <Alert.Message>
          <Text>{message}</Text>
        </Alert.Message>
      )}
    </Alert>
  );
}
