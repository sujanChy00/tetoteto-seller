import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { PrimaryButton } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { discountTypes, itemTypes } from "@/constants/data";
import { isIOS } from "@/constants/platform";
import { useForm } from "@/hooks/use-form";
import { useHaptics } from "@/hooks/use-haptics";
import { useLanguage } from "@/hooks/use-language";
import {
  useAddShippingCampaign,
  useUpdateShippingCampaign,
} from "@/mutation/campaign-mutation";

import { IShipppingCampaign } from "@/types";
import { errorToast } from "@/utils/toast";
import { useSelector } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import * as v from "valibot";
import { ShippingAreaSelector } from "./shipping-area-selector";
import {
  ShippingCampaignFormInput,
  ShippingCampaignSchema,
} from "./shipping-campaign-schema";

interface Props {
  campaign?: IShipppingCampaign;
  refetch?: () => Promise<any>;
}

export const ShippingCampaignForm = ({ campaign, refetch }: Props) => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const { t } = useLanguage();
  const hapticFeedBack = useHaptics();
  const { mutateAsync: updateMutation, isPending: updatingCampaign } =
    useUpdateShippingCampaign({
      onSuccess: () => {
        router.back();
      },
    });
  const { mutateAsync: addMutation, isPending: addingCampaign } =
    useAddShippingCampaign({
      onSuccess: () => {
        Form.reset();
        router.back();
      },
    });
  const isPending = updatingCampaign || addingCampaign;
  const initialDiscountType = useMemo(
    () =>
      campaign
        ? campaign.flatShippingCharge !== 0
          ? "flatShippingCharge"
          : campaign.flatShippingDiscount !== 0
            ? "flatShippingDiscount"
            : "shippingCampaignDiscountPercentage"
        : "",
    [campaign],
  );
  const discountInputLabel = useMemo(
    () => ({
      flatShippingDiscount: t("flat_discount"),
      flatShippingCharge: t("flat_amount"),
      shippingCampaignDiscountPercentage: t("discount") + " %",
    }),
    [t],
  );
  const discountTypeError = useMemo(
    () => ({
      shippingCampaignDiscountPercentage: t(
        "campaign_discount_percentage_error",
      ),
      flatShippingCharge: t("campaign_shipping_charge_error"),
      flatShippingDiscount: t("campaign_discount_error"),
    }),
    [t],
  );

  const Form = useForm({
    defaultValues: {
      flatShippingCharge: String(campaign?.flatShippingCharge ?? ""),
      flatShippingDiscount: String(campaign?.flatShippingDiscount ?? ""),
      shippingAreas: campaign?.shippingAreas.map((i) => i.shippingAreaId) ?? [],
      shippingCampaignActive: campaign?.shippingCampaignActive ?? false,
      shippingCampaignDescription: campaign?.shippingCampaignDescription ?? "",
      shippingCampaignDiscountPercentage: String(
        campaign?.shippingCampaignDiscountPercentage ?? "",
      ),
      shippingCampaignEndDate: campaign
        ? new Date(campaign?.shippingCampaignEndDate)
        : new Date(),
      shippingCampaignStartDate: campaign
        ? new Date(campaign?.shippingCampaignStartDate)
        : new Date(),
      shippingCampaignGivenBy: campaign?.shippingCampaignGivenBy ?? "",
      shippingCampaignMinimumOrderAmountThreshold: String(
        campaign?.shippingCampaignMinimumOrderAmountThreshold ?? "",
      ),
      shippingCampaignName: campaign?.shippingCampaignName || "",
      shippingCampaignType: campaign?.shippingCampaignType || "ASHA_ALL",
      discountType: initialDiscountType || "shippingCampaignDiscountPercentage",
    } satisfies ShippingCampaignFormInput,
    validators: {
      onSubmit: ShippingCampaignSchema,
    },
    onSubmitInvalid: () => {
      hapticFeedBack("error");
    },
    onSubmit: async ({ value, formApi, meta }) => {
      const parsedValue = v.parse(ShippingCampaignSchema, value);
      const { discountType, ...body } = parsedValue;
      const data = {
        ...body,
        flatShippingCharge:
          discountType === "flatShippingCharge"
            ? parsedValue.flatShippingCharge
            : undefined,
        flatShippingDiscount:
          discountType === "flatShippingDiscount"
            ? parsedValue.flatShippingDiscount
            : undefined,
        shippingCampaignDiscountPercentage:
          discountType === "shippingCampaignDiscountPercentage"
            ? parsedValue.shippingCampaignDiscountPercentage
            : undefined,
      };

      if (campaign) {
        updateMutation({
          campaignId: campaign.shippingCampaignId as number,
          ...data,
        });
        return;
      }

      if (!parsedValue[discountType]) {
        formApi.setFieldMeta(discountType, (prev) => ({
          ...prev,
          errorMap: {
            ...prev.errorMap,
            onSubmit: discountTypeError[discountType],
          },
        }));
        return;
      }

      if (!value.shippingAreas || value.shippingAreas.length === 0) {
        errorToast({
          title: "Error",
          description: "Please select at least one area",
        });

        return;
      }

      addMutation(body);
    },
  });

  const { discountType } = useSelector(Form.store, (state) => ({
    discountType: state.values.discountType,
  }));

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
          style={{ flex: 1 }}
        >
          <View className="flex-1 gap-y-6 w-full">
            <Form.AppField
              name="shippingCampaignName"
              children={(Field) => (
                <Field.TextField
                  multiline
                  returnKeyType="next"
                  label={t("campaign_name")}
                />
              )}
            />
            <Form.AppField
              name="shippingCampaignDescription"
              children={(Field) => (
                <Field.TextField multiline label={t("campaign_description")} />
              )}
            />
            <Form.AppField
              name="shippingCampaignType"
              children={(Field) => (
                <Field.SelectField options={itemTypes} label={t("item_type")} />
              )}
            />
            <Form.AppField
              name="shippingCampaignGivenBy"
              children={(Field) => (
                <Field.SelectField
                  options={[
                    { label: "Admin", value: "admin" },
                    { label: "Seller", value: "seller" },
                  ]}
                  label={t("given_by")}
                />
              )}
            />
            <Form.AppField
              name="shippingCampaignMinimumOrderAmountThreshold"
              children={(Field) => (
                <Field.TextField
                  multiline
                  label={t("threshold")}
                  keyboardType="numeric"
                  inputMode="numeric"
                />
              )}
            />
            <Form.AppField
              name="discountType"
              children={(Field) => (
                <Field.SelectField
                  isDisabled={!!campaign}
                  options={discountTypes}
                  label={t("discount_type")}
                />
              )}
            />

            <Form.AppField
              name={discountType}
              children={(Field) => (
                <Field.TextField
                  readOnly={!!campaign}
                  label={discountInputLabel[discountType]}
                />
              )}
            />
            <View className="flex-row gap-2">
              <Form.AppField
                name={"shippingCampaignStartDate"}
                children={(Field) => (
                  <Field.DateField label={t("start_date")} className="flex-1" />
                )}
              />
              <Form.AppField
                name={"shippingCampaignEndDate"}
                children={(Field) => (
                  <Field.DateField label={t("end_date")} className="flex-1" />
                )}
              />
            </View>
            <Form.AppField
              name={"shippingCampaignActive"}
              children={(Field) => (
                <Surface className="px-6 py-4">
                  <Field.SwitchField label={t("status")} />
                </Surface>
              )}
            />
            <Form.AppField
              name={"shippingAreas"}
              children={(Field) => (
                <ShippingAreaSelector
                  value={Field.state.value}
                  onChange={Field.handleChange}
                />
              )}
            />
            <Form.SubmitButton disabled={isPending}>
              {isPending && (
                <ActivityIndicator
                  size="small"
                  colorClassName="accent-primary-foreground"
                />
              )}
              <PrimaryButton.Label>{t("save")}</PrimaryButton.Label>
            </Form.SubmitButton>
          </View>
          <AnimatedSpacer height={100} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Form.AppForm>
  );
};
