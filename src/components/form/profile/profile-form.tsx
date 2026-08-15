import { AnimatedSpacer } from "@/components/ui/animated-spacer";
import { Button } from "@/components/ui/button";
import { StickyButtonWrapper } from "@/components/ui/sticky-button-wrapper";
import { useForm } from "@/hooks/use-form";
import { useHaptics } from "@/hooks/use-haptics";
import { useUploadImageAndCall } from "@/hooks/use-image-upload";
import { useIsKeyboardVisible } from "@/hooks/use-keyboard-visible";
import { useUser } from "@/hooks/use-user";
import {
  useChangeProfileImage,
  useUpdateProfile,
} from "@/mutation/profile-mutation";
import { useEffect, useRef } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { ProfileImagePicker } from "./profile-image-picker";

export const ProfileForm = () => {
  const isKeyboardVisible = useIsKeyboardVisible();
  const scrollViewRef = useRef<ScrollView>(null);
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

  useEffect(() => {
    if (!scrollViewRef.current) return;
    if (isKeyboardVisible) {
      scrollViewRef.current.scrollToEnd();
    }
  }, [isKeyboardVisible]);

  return (
    <Form.AppForm>
      <ScrollView
        ref={scrollViewRef}
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
            children={(Field) => <Field.TextField label="Name" />}
          />
        </View>
        <AnimatedSpacer height={450} />
      </ScrollView>
      <StickyButtonWrapper>
        <Form.SubmitButton disabled={isPending}>
          {isPending && <ActivityIndicator size={16} />}
          <Button.PrimaryLabel>Update Profile</Button.PrimaryLabel>
        </Form.SubmitButton>
      </StickyButtonWrapper>
    </Form.AppForm>
  );
};
