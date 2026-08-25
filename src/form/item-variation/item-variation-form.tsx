import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { ThemedText } from "@/components/ui/themed-text";
import { isIOS } from "@/constants/platform";
import { useForm } from "@/hooks/use-form";
import { useLanguage } from "@/hooks/use-language";
import {
  useAddItemVaritaions,
  useUpdateItemVariation,
} from "@/mutation/item-mutation";
import { IItemVaritions } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import * as v from "valibot";
import {
  ItemVariationInput,
  ItemVariationSchema,
} from "./item-variation-schema";

interface Props {
  refetch?: () => Promise<any>;
  variation?: IItemVaritions;
}

export const ItemVariationForm = ({ variation, refetch }: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();
  const { itemId } = useLocalSearchParams<{ itemId: string }>();

  const goBack = () => {
    router.back();
  };
  const { mutateAsync: updateItemVariation, isPending: updatingItemVariation } =
    useUpdateItemVariation({
      onSuccess: () => {
        goBack();
      },
    });
  const { mutateAsync: addItemVariation, isPending: addingItemVariation } =
    useAddItemVaritaions({
      onSuccess: () => {
        goBack();
      },
    });
  const Form = useForm({
    defaultValues: {
      name: variation?.name ?? "",
      price: String(variation?.price ?? ""),
      stock: String(variation?.stock ?? ""),
      weight: String(variation?.weight ?? ""),
    } satisfies ItemVariationInput,
    validators: {
      onSubmit: ItemVariationSchema,
    },
    onSubmit: async ({ value }) => {
      const parsed = v.parse(ItemVariationSchema, value);
      if (variation) {
        await updateItemVariation({
          data: parsed,
          itemId,
          variationname: variation.name,
        });
        return;
      }

      await addItemVariation({
        data: [parsed],
        itemId,
      });
    },
  });

  const isPending = addingItemVariation || updatingItemVariation;

  return (
    <Form.AppForm>
      <KeyboardAvoidingView
        behavior={isIOS ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          contentContainerClassName="p-4 pb-safe-offset-10"
          refreshControl={
            refetch ? (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  refetch().finally(() => setRefreshing(false));
                }}
              />
            ) : undefined
          }
        >
          <View className="flex-1 gap-y-6">
            <Form.AppField
              name="name"
              children={(Field) => (
                <Field.TextField label={t("variation_name")} />
              )}
            />
            <Form.AppField
              name="price"
              children={(Field) => (
                <Field.TextField
                  label={t("variation_price")}
                  inputMode="decimal"
                  keyboardType="decimal-pad"
                />
              )}
            />
            <Form.AppField
              name="stock"
              children={(Field) => (
                <Field.TextField
                  label={t("variation_stock")}
                  inputMode="numeric"
                  keyboardType="numeric"
                />
              )}
            />
            <Form.AppField
              name="weight"
              children={(Field) => (
                <Field.TextField
                  label={t("variation_weight")}
                  inputMode="decimal"
                  keyboardType="decimal-pad"
                />
              )}
            />
            <Form.SubmitButton disabled={isPending}>
              {isPending && (
                <ActivityIndicator
                  size={"small"}
                  colorClassName="accent-primary-foreground"
                />
              )}
              <ThemedText className="text-primary-foreground">
                {t("save")}
              </ThemedText>
            </Form.SubmitButton>
            <AnimatedSpacer height={60} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Form.AppForm>
  );
};
