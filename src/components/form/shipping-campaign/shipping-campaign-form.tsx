import { isIOS } from "@/constants/platform";
import { useForm } from "@/hooks/use-form";
import { useHaptics } from "@/hooks/use-haptics";
import { useLanguage } from "@/hooks/use-language";
import {
  ShippingCampaignFormInput,
  ShippingCampaignSchema,
} from "@/schema/shipping-campaign-schema";
import { IShipppingCampaign } from "@/types";
import { Picker } from "@expo/ui/community/picker";
import { useSelector } from "@tanstack/react-form";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

export const ShippingCampaignForm = ({
  campaign,
}: {
  campaign?: IShipppingCampaign;
}) => {
  const [language, setLanguage] = useState("java");
  const { t } = useLanguage();
  const hapticFeedBack = useHaptics();
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
    // onSubmit: async ({ value }) => {
    //   const parsed = v.parse(ShippingFeeSchema, value);
    //   await mutateAsync({
    //     shippingInfo: parsed,
    //     id: Number(id),
    //   });
    // },
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
          style={{ flex: 1 }}
        >
          <View className="flex-1 gap-y-6 w-full">
            <Form.AppField
              name="shippingCampaignName"
              children={(Field) => (
                <Field.TextField multiline label={t("campaign_name")} />
              )}
            />
            <Form.AppField
              name="shippingCampaignDescription"
              children={(Field) => (
                <Field.TextField multiline label={t("campaign_description")} />
              )}
            />
            {/*Replace with Select*/}
            <Form.AppField
              name="shippingCampaignType"
              children={(Field) => (
                <Field.TextField multiline label={t("item_type")} />
              )}
            />
            {/*Replace with Select*/}
            <Form.AppField
              name="shippingCampaignGivenBy"
              children={(Field) => (
                <Field.TextField multiline label={t("given_by")} />
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
            {/*Replace with Select*/}
            <Form.AppField
              name="discountType"
              children={(Field) => (
                <Field.TextField
                  isDisabled={!!campaign}
                  label={t("discount_type")}
                />
              )}
            />
            <View style={{ flexDirection: "row", width: "100%" }}>
              <Picker
                selectedValue={language}
                style={{ flex: 1 }}
                onValueChange={(value) => setLanguage(value)}
              >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="Objective C" value="objc" />
                <Picker.Item label="Swift" value="swift" />
              </Picker>
            </View>
            <Form.AppField
              name={discountType}
              children={(Field) => (
                <Field.TextField
                  readOnly={!!campaign}
                  label={discountInputLabel[discountType]}
                />
              )}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Form.AppForm>
  );
};
