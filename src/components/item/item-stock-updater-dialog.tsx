import { useLanguage } from "@/hooks/use-language";
import { useUpdateItemStock } from "@/mutation/item-mutation";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SecondaryButton } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { Field, FieldLabel } from "../ui/field";
import { TextInput } from "../ui/text-input";
import { ThemedText } from "../ui/themed-text";

interface Props {
  itemId: string;
  itemName: string;
  stock: number;
}

export const ItemStockUpdateDialog = ({ itemId, itemName, stock }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState<string>(stock?.toString());
  const { t } = useLanguage();

  const { mutateAsync, isPending } = useUpdateItemStock({
    onSuccess: () => {
      setModalVisible(false);
    },
  });

  const onUpdateStock = async () => {
    await mutateAsync({
      itemId,
      stock: Number(quantity),
    });
  };

  return (
    <>
      <SecondaryButton
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <SecondaryButton.Label>Update Stock</SecondaryButton.Label>
      </SecondaryButton>
      <Dialog isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={24}>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Update Stock</Dialog.Title>
              <Dialog.Description className="text-sm">
                Enter new stock quantity for{" "}
                <ThemedText className="text-primary text-sm">
                  {itemName}
                </ThemedText>
              </Dialog.Description>
            </Dialog.Header>
            <Field>
              <FieldLabel>Stock</FieldLabel>
              <TextInput
                autoFocus
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="number-pad"
                inputMode="numeric"
                placeholder="Enter quantity"
              />
            </Field>
            <Dialog.Footer>
              <Dialog.Close
                disabled={isPending}
                onPress={() => {
                  setModalVisible(false);
                }}
              />
              <Dialog.Action disabled={isPending} onPress={onUpdateStock}>
                {isPending && (
                  <ActivityIndicator colorClassName="accent-primary-foreground" />
                )}
                <Dialog.ActionLabel>{t("update")}</Dialog.ActionLabel>
              </Dialog.Action>
            </Dialog.Footer>
          </Dialog.Content>
        </KeyboardAvoidingView>
      </Dialog>
    </>
  );
};
