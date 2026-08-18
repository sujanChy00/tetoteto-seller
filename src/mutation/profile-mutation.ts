import { useMutation, useQueryClient } from "@tanstack/react-query";

import { GET_PROFILE_QUERY_KEY } from "@/constants/query-keys";
import { useHaptics } from "@/hooks/use-haptics";
import { IGeneralResponse, mutationProps } from "@/types/IGeneral";
import { IProfile } from "@/types/IProfile";
import { fetcher } from "@/utils/fetcher";
import { errorToast, successToast } from "@/utils/toast";

export const useUpdateProfile = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const queryClient = useQueryClient();
  const hapticFeedback = useHaptics();

  return useMutation({
    mutationFn: async (body: { name?: string }) =>
      await fetcher<IGeneralResponse>({
        url: "/shop/assistant",
        method: "PATCH",
        data: body,
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: [GET_PROFILE_QUERY_KEY] });
      successToast({
        title: "Success",
        description: data?.message,
      });
      onSuccess?.(data);
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
}: mutationProps<IProfile> = {}) => {
  const queryClient = useQueryClient();
  const hapticFeedback = useHaptics();

  return useMutation({
    mutationFn: async ({ data }: { data: { image_url: string[] } }) =>
      await fetcher<IProfile>({
        url: "/shop/assistant/image",
        method: "PUT",
        data,
      }),
    async onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: [GET_PROFILE_QUERY_KEY] });
      successToast({
        title: "Success",
        description: "Profile image updated successfully",
      });
      onSuccess?.(data);
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
