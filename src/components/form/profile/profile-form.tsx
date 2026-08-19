import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { PrimaryButton } from "@/components/ui/button";
import { StickyButtonWrapper } from "@/components/ui/sticky-button-wrapper";
import { useForm } from "@/hooks/use-form";
import { useHaptics } from "@/hooks/use-haptics";
import { useUploadImageAndCall } from "@/hooks/use-image-upload";
import { useScrollToBottomOnKeyboardVisible } from "@/hooks/use-scroll-to-bottom-on-keyboard-visible";
import { useUser } from "@/hooks/use-user";
import {
  useChangeProfileImage,
  useUpdateProfile,
} from "@/mutation/profile-mutation";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { ProfileImagePicker } from "./profile-image-picker";

export const ProfileForm = () => {
  const { scrollViewRef } = useScrollToBottomOnKeyboardVisible();
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
      await updateProfileSync({
        name: value.name,
      });
    },
  });

  const isPending = isProfilePending || isProfileImagePending || isUploading;

  return (
    <Form.AppForm>
      <ScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        contentContainerClassName="pt-20 px-4"
      >
        <View className="gap-y-10">
          <Form.AppField
            name="image"
            children={(Field) => (
              <ProfileImagePicker
                isUploading={isUploading || isProfileImagePending}
                fallback={user?.profileDetails.shopAssistantName ?? ""}
                caption={user?.profileDetails.shopAssistantName}
                subCaption={user?.profileDetails.shopAssistantEmail}
                imagePickerOptions={{
                  shape: "oval",
                  allowsEditing: true,
                  aspect: [1, 1],
                }}
                value={Field.state.value}
                onChange={async (img) => {
                  Field.handleChange(img);
                  uploadImage([img], async (imgs) => {
                    await changeProfileImage({
                      data: { image_url: [imgs?.[0]] },
                    });
                  });
                }}
              />
            )}
          />

          <Form.AppField
            name="name"
            children={(Field) => <Field.TextField label="Name" />}
          />
        </View>
        <AnimatedSpacer height={450} />
      </ScrollView>
      <StickyButtonWrapper>
        <Form.SubmitButton disabled={true}>
          {isProfilePending && <ActivityIndicator size={16} />}
          <PrimaryButton.Label>Update Profile</PrimaryButton.Label>
        </Form.SubmitButton>
      </StickyButtonWrapper>
    </Form.AppForm>
  );
};
