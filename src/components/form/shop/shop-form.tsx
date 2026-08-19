import { PrimaryButton } from "@/components/ui/button";
import { isIOS } from "@/constants/platform";
import { useForm } from "@/hooks/use-form";
import { useHaptics } from "@/hooks/use-haptics";
import { useUploadImageAndCall } from "@/hooks/use-image-upload";
import { useLanguage } from "@/hooks/use-language";
import { useUpdateShop, useUpdateShopImage } from "@/mutation/shop-mutation";
import { ShopFormValues, ShopSchema } from "@/schema/shop-schema";
import { IshopDetails } from "@/types";
import { useRouter } from "expo-router";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { ProfileImagePicker } from "../profile/profile-image-picker";

export const ShopForm = ({ data }: { data: IshopDetails }) => {
  const { t } = useLanguage();
  const hapticFeedBack = useHaptics();
  const router = useRouter();
  const { mutateAsync: updateShop, isPending: updatingShop } = useUpdateShop({
    onSuccess: () => {
      router.back();
    },
  });
  const { mutateAsync: changeshopImage, isPending: changingshopImage } =
    useUpdateShopImage();
  const { isUploading, uploadImage } = useUploadImageAndCall();

  const Form = useForm({
    defaultValues: {
      shopName: data?.shopName ?? "",
      orderAmount: data.orderAmount ?? "",
      lowStockThreshold: data.lowStockThreshold ?? "",
      shopAddress: data?.shopAddress ?? "",
      shopFacebookUrl: data?.shopFacebookUrl ?? "",
      shopIntroduction: data?.shopIntroduction ?? "",
      shopPhoneNumber: data?.shopPhoneNumber ?? "",
      shopPostalCode: data?.shopPostalCode ?? "",
      shopRegistrationNumber: data?.shopRegistrationNumber ?? "",
      shopTiktokUrl: data?.shopTiktokUrl ?? "",
      expiryThreshold: data.expiryThreshold ?? "",
      shopImage: data?.shopPhotoUrl ?? "",
    } as ShopFormValues,
    validators: {
      onSubmit: ShopSchema,
    },
    onSubmitInvalid: () => {
      hapticFeedBack("error");
    },
    onSubmit: async ({ value }) => {
      const { shopImage, ...rest } = value;
      await updateShop({
        data: rest,
        shopId: data.shopId,
      });
    },
  });

  const isDisabled = updatingShop || changingshopImage || isUploading;

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
          <View className="flex-1 gap-y-6">
            <Form.AppField
              name="shopImage"
              children={(Field) => (
                <ProfileImagePicker
                  fallback={data.shopName}
                  caption={data.shopName}
                  isUploading={isUploading || changingshopImage}
                  value={Field.state.value}
                  onChange={async (img) => {
                    Field.handleChange(img);
                    uploadImage([img], async (imgs) => {
                      await changeshopImage({
                        image: imgs?.[0],
                        shopId: String(data.shopId),
                      });
                    });
                  }}
                />
              )}
            />
            <Form.AppField
              name="shopName"
              children={(Field) => <Field.TextField label={t("shop_name")} />}
            />
            <Form.AppField
              name="orderAmount"
              children={(Field) => (
                <Field.TextField
                  label={t("minimum_order_amount")}
                  keyboardType="numeric"
                  inputMode="numeric"
                />
              )}
            />
            <Form.AppField
              name="lowStockThreshold"
              children={(Field) => (
                <Field.TextField
                  label={t("low_stock_threshold")}
                  keyboardType="numeric"
                  inputMode="numeric"
                />
              )}
            />
            <Form.AppField
              name="shopAddress"
              children={(Field) => (
                <Field.TextField label={t("shop_address")} multiline />
              )}
            />
            <Form.AppField
              name="shopIntroduction"
              children={(Field) => (
                <Field.TextField label={t("promotional_message")} />
              )}
            />
            <Form.AppField
              name="shopPhoneNumber"
              children={(Field) => (
                <Field.TextField
                  label={t("phone_number")}
                  keyboardType="phone-pad"
                  inputMode="tel"
                />
              )}
            />
            <Form.AppField
              name="shopPostalCode"
              children={(Field) => <Field.TextField label="Shop Postal Code" />}
            />
            <Form.AppField
              name="shopRegistrationNumber"
              children={(Field) => (
                <Field.TextField
                  label={t("shop_registration_number")}
                  keyboardType="numeric"
                  inputMode="numeric"
                />
              )}
            />
            <Form.AppField
              name="shopFacebookUrl"
              children={(Field) => (
                <Field.TextField
                  label="Shop Facebook URL"
                  keyboardType="url"
                  inputMode="url"
                />
              )}
            />
            <Form.AppField
              name="shopTiktokUrl"
              children={(Field) => (
                <Field.TextField
                  label="Shop TikTok URL"
                  keyboardType="url"
                  inputMode="url"
                />
              )}
            />
            <Form.AppField
              name="expiryThreshold"
              children={(Field) => (
                <Field.TextField
                  label={t("expiry_threshold")}
                  keyboardType="numeric"
                  inputMode="numeric"
                />
              )}
            />
            <Form.SubmitButton disabled={isDisabled}>
              {updatingShop && <ActivityIndicator size={"small"} />}
              <PrimaryButton.Label>Update</PrimaryButton.Label>
            </Form.SubmitButton>
          </View>
          <View className="h-20" />
        </ScrollView>
      </KeyboardAvoidingView>
    </Form.AppForm>
  );
};
