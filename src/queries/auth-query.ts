import { BIOMETRIC_EMAIL_KEY } from "@/constants/data";
import { isWeb } from "@/constants/platform";
import { GET_BIOMETRIC_STATUS_QUERY_KEY } from "@/constants/query-keys";
import { BiometricsStatus, IProfile } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

export async function getUser() {
  return await fetcher<IProfile>({
    url: "/shop/assistant/profile",
  });
}

export const useCheckForBiometrics = () => {
  return useQuery<BiometricsStatus>({
    queryKey: [GET_BIOMETRIC_STATUS_QUERY_KEY],
    queryFn: async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();

      if (!hasHardware) {
        return {
          hasHardware: false,
          isEnrolled: false,
          isBiometricLoginEnabled: false,
        };
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const storedEmail = await SecureStore.getItemAsync(BIOMETRIC_EMAIL_KEY);

      return {
        hasHardware,
        isEnrolled,
        isBiometricLoginEnabled: isEnrolled && !!storedEmail,
      };
    },
    enabled: !isWeb,
    staleTime: Infinity, // hardware/enrollment status doesn't change during a session
  });
};
