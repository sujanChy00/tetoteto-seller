import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { FormStickySubmitButtonWrapper } from "@/components/ui/form-sticky-submit-button-wrapper";
import { Host } from "@/components/ui/host";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@/hooks/use-form";
import { useHaptics } from "@/hooks/use-haptics";
import { useUploadImageAndCall } from "@/hooks/use-image-upload";
import { useUser } from "@/hooks/use-user";
import {
  useChangeProfileImage,
  useUpdateProfile,
} from "@/mutation/profile-mutation";
import { Row, Text } from "@expo/ui";
import { ScrollView, View } from "react-native";
import { ProfileImagePicker } from "./profile-image-picker";

export const ProfileForm = () => {
  const hapticFeedBack = useHaptics();
  const { user } = useUser();
  const { mutateAsync: updateProfileSync, isPending: isProfilePending } =
    useUpdateProfile();
  const { isUploading, uploadImage } = useUploadImageAndCall();
  const { mutateAsync: changeProfileImage, isPending: isProfileImagePending } =
    useChangeProfileImage();
  const Form = useForm({
    defaultValues: {
      name: user?.profileDetails.shopAssistantName ?? "",
      image: user?.profileDetails.shopAssistantPhotoUrl ?? "",
    },

    onSubmitInvalid: () => {
      hapticFeedBack("error");
    },
    onSubmit: async ({ value }) => {
      uploadImage([value.image], async (imgs) => {
        await changeProfileImage({ data: { image_url: [imgs?.[0]] } });
      });
      await updateProfileSync({
        name: value.name,
      });
    },
  });

  const isPending = isProfilePending || isProfileImagePending || isUploading;

  return (
    <Form.AppForm>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        contentContainerClassName="pt-20 px-2"
      >
        <View className="gap-y-10">
          <Form.AppField
            name="image"
            children={(Field) => (
              <ProfileImagePicker
                value={Field.state.value}
                onChange={Field.handleChange}
              />
            )}
          />

          <Form.AppField
            name="name"
            children={(Field) => (
              <Host matchContents={{ vertical: true }}>
                <Field.TextField label="Name" />
              </Host>
            )}
          />
        </View>
        <AnimatedSpacer height={450} />
      </ScrollView>
      <FormStickySubmitButtonWrapper>
        <Form.SubmitButton disabled={isPending}>
          <Row alignment="center" spacing={6}>
            {isPending && <Spinner size={16} />}
            <Text>Update Profile</Text>
          </Row>
        </Form.SubmitButton>
      </FormStickySubmitButtonWrapper>
    </Form.AppForm>
  );
};
