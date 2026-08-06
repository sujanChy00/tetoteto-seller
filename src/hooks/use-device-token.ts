import { useMMKVString } from "react-native-mmkv";

import { DEVICE_TOKEN_KEY } from "@/constants/query-keys";
import { storage } from "@/utils/storage";

export const useDeviceToken = () => {
  const [deviceToken, setDeviceToken] = useMMKVString(
    DEVICE_TOKEN_KEY,
    storage,
  );

  return { deviceToken, setDeviceToken };
};
