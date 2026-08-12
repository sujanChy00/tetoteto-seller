import { TOKEN_KEY } from "@/constants/query-keys";
import { useAppInit } from "@/hooks/use-app-init";
import { useHaptics } from "@/hooks/use-haptics";
import { useUser } from "@/hooks/use-user";
import { LoginFormData } from "@/schema/auth-schema";
import { IGeneralResponse, ISignInResponse } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { storage } from "@/utils/storage";
import { toast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

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

export const useUpdatePassword = () => {
  const hapticFeedback = useHaptics();
  return useMutation({
    mutationFn: async (data: {
      newPassword: string;
      email?: string;
      code?: string;
      token?: string;
      oldPassword?: string | null;
    }) =>
      fetcher<IGeneralResponse>({
        url: `/shop/assistant/change-password`,
        method: "PUT",
        data,
      }),
    onSuccess(data) {
      toast.success(data?.message);
    },
    onError(error) {
      hapticFeedback("error");
      toast.error(error.message);
    },
  });
};

export const useValidateLinkMutation = () => {
  return useMutation({
    mutationFn: async (token: string) =>
      await fetcher({
        url: "shop/assistant/validate-token",
        method: "POST",
        data: { token },
      }),
  });
};

export const useResetPassword = () => {
  const router = useRouter();
  const hapticFeedback = useHaptics();

  return useMutation({
    mutationFn: async (data: {
      newPassword: string;
      email: string;
      code: string;
    }) =>
      fetcher<IGeneralResponse>({
        url: `/shop/assistant/change-password`,
        method: "PUT",
        data,
      }),
    onSuccess(data) {
      toast.success(data?.message);
      router.push("/(auth)");
    },
    onError(error) {
      hapticFeedback("error");
      toast.error(error.message);
    },
  });
};

export const useValidateCode = () => {
  const router = useRouter();
  const hapticFeedback = useHaptics();

  return useMutation({
    mutationFn: async (data: {
      deviceToken?: string;
      email: string;
      reset_code: number;
    }) =>
      fetcher<IGeneralResponse>({
        url: "/shop/assistant/validate-code",
        method: "POST",
        data,
      }),
    onSuccess(data, { email, reset_code }) {
      toast.success("OTP verified successfully");

      router.navigate({
        pathname: "/auth/update-password",
        params: { email, otp: reset_code },
      });
    },
    onError(error) {
      hapticFeedback("error");
      toast.error(error.message);
    },
  });
};

export const useSendResetEmail = () => {
  const router = useRouter();
  const hapticFeedback = useHaptics();

  return useMutation({
    mutationFn: async ({ reset_email }: { reset_email: string }) =>
      fetcher<IGeneralResponse>({
        url: "/shop/assistant/reset-password",
        method: "POST",
        data: {
          reset_email,
        },
      }),
    onSuccess(data, { reset_email }) {
      let message: string = "";
      if ("message" in data) {
        message = data.message || "otp verified successfully";
      }
      toast.success(message);
      router.navigate({
        pathname: "/auth/otp",
        params: { email: reset_email },
      });
    },
    onError(error) {
      hapticFeedback("error");
      toast.error(error.message);
    },
  });
};
