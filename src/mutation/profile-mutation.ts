import { useMutation } from "@tanstack/react-query";

import { useHaptics } from "@/hooks/use-haptics";
import { useUser } from "@/hooks/use-user";
import { IGeneralResponse, mutationProps } from "@/types/IGeneral";
import { fetcher } from "@/utils/fetcher";
import { errorToast, successToast } from "@/utils/toast";

export const useUpdateProfile = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const hapticFeedback = useHaptics();
  const { setUser, user } = useUser();

  return useMutation({
    mutationFn: async (body: { name?: string }) =>
      await fetcher<IGeneralResponse>({
        url: "/shop/assistant",
        method: "PATCH",
        data: body,
      }),
    onSuccess(data, { name }) {
      successToast({
        title: "Success",
        description: data?.message,
      });
      onSuccess?.(data);
      if (!user || !name) return;
      setUser({
        ...user,
        profileDetails: {
          ...user.profileDetails,
          shopAssistantName: name,
        },
      });
    },
    onError(error) {
      hapticFeedback("error");
      errorToast({
        title: "Error",
        description: error.message,
      });
      onError?.(error);
    },
  });
};

export const useChangeProfileImage = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const { setUser, user } = useUser();
  const hapticFeedback = useHaptics();

  return useMutation({
    mutationFn: async ({ data }: { data: { image_url: string[] } }) =>
      await fetcher<IGeneralResponse>({
        url: "/shop/assistant/image",
        method: "PUT",
        data,
      }),
    async onSuccess(data) {
      successToast({
        title: "Success",
        description: "Profile image updated successfully",
      });
      onSuccess?.(data);
      if (!user) return;
      setUser({
        ...user,
        profileDetails: {
          ...user.profileDetails,
          shopAssistantPhotoUrl: data?.message,
        },
      });
    },
    onError(error) {
      hapticFeedback("error");
      errorToast({
        title: "Error",
        description: error.message,
      });
      onError?.(error);
    },
  });
};
