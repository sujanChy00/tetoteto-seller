import { TOKEN_KEY } from "@/constants/query-keys";
import { useAppInit } from "@/hooks/use-app-init";
import { useHaptics } from "@/hooks/use-haptics";
import { useUser } from "@/hooks/use-user";
import { LoginFormData } from "@/schema/auth-schema";
import { ISignInResponse } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { storage } from "@/utils/storage";
import { toast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

export const useLogoutMutation = () => {
  const { setUser } = useUser();

  return useMutation({
    mutationFn: async () =>
      await fetcher({
        url: "/shop/assistant/logout",
        method: "POST",
      }),
    onSuccess() {
      storage.remove(TOKEN_KEY);
      setUser(null);
    },
  });
};

export const useLoginMutation = () => {
  const { user } = useUser();
  const { initApp } = useAppInit();
  const hapticFeedback = useHaptics();

  return useMutation({
    mutationFn: async (data: LoginFormData) =>
      await fetcher<ISignInResponse>({
        url: "/shop/assistant/login",
        method: "POST",
        data,
      }),
    onSuccess(data) {
      initApp();
      const passwordExpired = user?.profileDetails.shopAssistantPasswordExpired;
      if (passwordExpired) {
        toast.warning("Password Expired", {
          description: data.message,
        });
      }
    },
    onError(error) {
      hapticFeedback("error");
      toast.error(error.message);
    },
  });
};
