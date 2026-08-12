import { useMutation, useQueryClient } from "@tanstack/react-query";

import { GET_PROFILE_QUERY_KEY } from "@/constants/query-keys";
import { useHaptics } from "@/hooks/use-haptics";
import { IGeneralResponse } from "@/types/IGeneral";
import { IProfile } from "@/types/IProfile";
import { fetcher } from "@/utils/fetcher";
import { toast } from "@/utils/toast";

export const useUpdateProfile = () => {
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
      toast.success(data?.message);
    },
    onError(error) {
      hapticFeedback("error");
      toast.error(error.message);
    },
  });
};

export const useChangeProfileImage = () => {
  const queryClient = useQueryClient();
  const hapticFeedback = useHaptics();

  return useMutation({
    mutationFn: async ({ data }: { data: { image_url: string[] } }) =>
      await fetcher<IProfile>({
        url: "/shop/assistant/image",
        method: "PUT",
        data,
      }),
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_PROFILE_QUERY_KEY] });
      toast.success("Profile image updated successfully");
    },
    onError(error) {
      hapticFeedback("error");
      toast.error(error.message);
    },
  });
};
