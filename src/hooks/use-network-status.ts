import { errorToast, successToast } from "@/utils/toast";
import NetInfo from "@react-native-community/netinfo";
import { useEffect, useRef } from "react";

export const useNetworkStatus = () => {
  const wasConnected = useRef<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const isConnected = state.isConnected ?? false;

      if (wasConnected.current !== null) {
        if (wasConnected.current && !isConnected) {
          errorToast({
            title: "No internet connection",
          });
        }

        if (!wasConnected.current && isConnected) {
          successToast({
            title: "Internet connection restored",
          });
        }
      }

      wasConnected.current = isConnected;
    });

    return unsubscribe;
  }, []);
};
