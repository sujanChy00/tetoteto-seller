import { useLanguage } from "@/hooks/use-language";
import { AlertDialogProps } from "@/types/components";
import {
  Button,
  CircularProgressIndicator,
  AlertDialog as NativeAlertDialog,
  Row,
  Spacer,
  Text,
  TextButton,
} from "@expo/ui/jetpack-compose";
import {
  animateContentSize,
  size,
  width,
} from "@expo/ui/jetpack-compose/modifiers";
import { useState } from "react";
import { useCSSVariable } from "uniwind";

export function AlertDialog({
  title,
  message,
  trigger,
  cancelButtonText,
  confirmButtonText,
  onConfirm,
  confirmButtonRole,
  isConfirming = false,
}: AlertDialogProps) {
  const dangerColor = useCSSVariable("--color-danger");
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const open = () => setVisible(true);
  const close = () => setVisible(false);

  const buttonRoleDestructive = confirmButtonRole === "destructive";

  return (
    <>
      {trigger(open)}
      {visible && (
        <NativeAlertDialog
          properties={{
            dismissOnClickOutside: false,
            dismissOnBackPress: false,
          }}
          onDismissRequest={close}
        >
          <NativeAlertDialog.Title>
            <Text>{title}</Text>
          </NativeAlertDialog.Title>
          {message && (
            <NativeAlertDialog.Text>
              <Text>{message}</Text>
            </NativeAlertDialog.Text>
          )}
          <NativeAlertDialog.DismissButton>
            <TextButton
              onClick={() => {
                close();
              }}
            >
              <Text>{t(cancelButtonText ?? "cancel")}</Text>
            </TextButton>
          </NativeAlertDialog.DismissButton>
          <NativeAlertDialog.ConfirmButton>
            <Button
              enabled={!isConfirming}
              onClick={() => {
                onConfirm();
                close();
              }}
              colors={{
                containerColor: buttonRoleDestructive
                  ? (dangerColor as string)
                  : undefined,
              }}
              modifiers={[animateContentSize()]}
            >
              <Row verticalAlignment="center" horizontalAlignment="center">
                {isConfirming && (
                  <CircularProgressIndicator
                    strokeWidth={2}
                    modifiers={[size(15, 15)]}
                    color={"#fff"}
                  />
                )}
                <Spacer modifiers={[width(4)]} />
                <Text color={buttonRoleDestructive ? "#fff" : undefined}>
                  {t(confirmButtonText ?? "confirm")}
                </Text>
              </Row>
            </Button>
          </NativeAlertDialog.ConfirmButton>
        </NativeAlertDialog>
      )}
    </>
  );
}
