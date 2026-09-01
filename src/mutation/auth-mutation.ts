import { BIOMETRIC_EMAIL_KEY, BIOMETRIC_PASSWORD_KEY } from "@/constants/data";
import { isIOS, isNative } from "@/constants/platform";
import {
  GET_BIOMETRIC_STATUS_QUERY_KEY,
  TOKEN_KEY,
} from "@/constants/query-keys";
import { useAppInit } from "@/hooks/use-app-init";
import { useDeviceToken } from "@/hooks/use-device-token";
import { useHaptics } from "@/hooks/use-haptics";
import { useLanguage } from "@/hooks/use-language";
import { useUser } from "@/hooks/use-user";
import {
  BiometricLoginError,
  IGeneralResponse,
  ISignInRequest,
  ISignInResponse,
  mutationProps,
} from "@/types";
import { fetcher } from "@/utils/fetcher";
import { storage } from "@/utils/storage";
import { errorToast, successToast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

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
  const queryClient = useQueryClient();
  const { initApp } = useAppInit();
  const hapticFeedback = useHaptics();

  return useMutation({
    mutationFn: async (data: ISignInRequest) =>
      await fetcher<ISignInResponse>({
        url: "/shop/assistant/login",
        method: "POST",
        data,
      }),
    async onSuccess(data, variables) {
      initApp();
      const passwordExpired = user?.profileDetails.shopAssistantPasswordExpired;
      if (passwordExpired) {
        errorToast({
          title: "Password Expired",
          description: data.message,
        });
      }
      if (isNative) {
        await SecureStore.setItemAsync(BIOMETRIC_EMAIL_KEY, variables.email);
        await SecureStore.setItemAsync(
          BIOMETRIC_PASSWORD_KEY,
          variables.password,
        );
        queryClient.invalidateQueries({
          queryKey: [GET_BIOMETRIC_STATUS_QUERY_KEY],
        });
      }
    },
    onError(error) {
      hapticFeedback("error");
      errorToast({
        title: "Error",
        description: error.message,
      });
    },
  });
};

export const useUpdatePassword = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const hapticFeedback = useHaptics();
  const queryClient = useQueryClient();

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
    onSuccess: async (data, variables) => {
      if (isNative) {
        const storedEmail = await SecureStore.getItemAsync(BIOMETRIC_EMAIL_KEY);
        if (
          storedEmail &&
          (!variables.email || storedEmail === variables.email)
        ) {
          await SecureStore.setItemAsync(
            BIOMETRIC_PASSWORD_KEY,
            variables.newPassword,
          );
          queryClient.invalidateQueries({
            queryKey: [GET_BIOMETRIC_STATUS_QUERY_KEY],
          });
        }
      }

      successToast({
        title: "Success",
        description: data.message,
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

export const useValidateLinkMutation = () => {
  const haptics = useHaptics();
  const { t } = useLanguage();
  return useMutation({
    mutationFn: async (token: string) =>
      await fetcher({
        url: "shop/assistant/validate-token",
        method: "POST",
        data: { token },
      }),
    onError: (err) => {
      haptics("error");
      errorToast({
        title: t("error"),
        description: err.message,
      });
    },
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
      successToast({
        title: "Success",
        description: data.message,
      });
      router.push("/(auth)");
    },
    onError(error) {
      hapticFeedback("error");
      errorToast({
        title: "Error",
        description: error.message,
      });
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
      successToast({
        title: "Success",
        description: data.message,
      });

      router.navigate({
        pathname: "/auth/update-password",
        params: { email, otp: reset_code },
      });
    },
    onError(error) {
      hapticFeedback("error");
      errorToast({
        title: "Error",
        description: error.message,
      });
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
      successToast({
        title: "Success",
        description: message,
      });
      router.navigate({
        pathname: "/auth/otp",
        params: { email: reset_email },
      });
    },
    onError(error) {
      hapticFeedback("error");
      errorToast({
        title: "Error",
        description: error.message,
      });
    },
  });
};

export const useBiometricLoginMutation = () => {
  const hapticFeedback = useHaptics();
  const { deviceToken } = useDeviceToken();
  const queryClient = useQueryClient();
  const { mutateAsync: login } = useLoginMutation();

  return useMutation({
    mutationFn: async () => {
      const storedEmail = await SecureStore.getItemAsync(BIOMETRIC_EMAIL_KEY);
      const storedPassword = await SecureStore.getItemAsync(
        BIOMETRIC_PASSWORD_KEY,
      );

      if (!storedEmail || !storedPassword) {
        throw new BiometricLoginError("not_set_up");
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: isIOS ? "Login with Face ID" : "Login with Fingerprint",
        cancelLabel: "Cancel",
        disableDeviceFallback: true,
      });

      if (!result.success) {
        throw new BiometricLoginError(result.error);
      }

      await login({
        email: storedEmail,
        password: storedPassword,
        deviceToken,
      });
    },
    onError(error) {
      hapticFeedback("error");

      if (!(error instanceof BiometricLoginError)) {
        errorToast({
          title: "Something went wrong",
          description: "Something went wrong. Please try logging in manually.",
        });
        return;
      }

      switch (error.code) {
        case "not_set_up":
          errorToast({
            title: "Not set up",
            description:
              "Biometric login isn't set up. Please log in manually first.",
          });
          break;
        case "user_cancel":
        case "app_cancel":
        case "system_cancel":
          break;
        case "lockout":
          errorToast({
            title: "Too many attempts",
            description: "Biometrics locked — use your passcode or password.",
          });
          break;
        case "not_enrolled":
          errorToast({
            title: "No biometrics found",
            description: "No biometrics found on this device.",
          });
          queryClient.invalidateQueries({
            queryKey: [GET_BIOMETRIC_STATUS_QUERY_KEY],
          });
          break;
        case "not_available":
          errorToast({
            title: "Not available",
            description: "Biometric authentication isn't available right now.",
          });
          break;
        default:
          errorToast({
            title: "Login failed",
            description: "Biometric login failed. Please try again.",
          });
      }
    },
  });
};
