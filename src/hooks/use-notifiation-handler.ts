import { isAndroid } from "@/constants/platform";
import { useLoading } from "@/context/auth-provider";
import { useUser } from "@/hooks/use-user";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useEffect } from "react";
import { useDeviceToken } from "./use-device-token";

export const useNotificationHandler = () => {
  const { setDeviceToken } = useDeviceToken();
  const { user } = useUser();
  const { loading } = useLoading();

  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  async function registerForPushNotificationsAsync() {
    if (isAndroid) {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
        showBadge: true,
      });
    }

    if (!Device.isDevice) {
      console.warn("Push notifications require a physical device.");
      return;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== Notifications.PermissionStatus.GRANTED) {
      const { status } = await Notifications.requestPermissionsAsync({
        ios: { allowAlert: true, allowBadge: true, allowSound: true },
      });
      finalStatus = status;
    }

    if (finalStatus !== Notifications.PermissionStatus.GRANTED) {
      alert("Failed to get push token — permission not granted!");
      return;
    }

    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;

      if (!projectId) throw new Error("Project ID not found");

      const { data: deviceToken } = await Notifications.getExpoPushTokenAsync({
        projectId,
      });

      setDeviceToken(deviceToken);
    } catch (e) {
      console.error("Error getting push token:", e);
    }
  }

  function redirect(notification: Notifications.Notification) {
    const trigger = notification.request.trigger;

    let remoteData: Record<string, any> | undefined;
    if (trigger && "remoteMessage" in trigger) {
      remoteData = (trigger as any).remoteMessage?.data;
    }

    const url =
      remoteData?.url ||
      notification.request.content?.data?.url ||
      remoteData?.deepLink ||
      notification.request.content?.data?.deepLink;

    if (!url) return;

    if (user) {
      router.push(url);
    } else {
      router.navigate({
        pathname: "/(auth)",
        params: { next: url },
      });
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  useEffect(() => {
    if (loading || !lastNotificationResponse) return;

    if (
      lastNotificationResponse.actionIdentifier ===
      Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      redirect(lastNotificationResponse.notification);
    }

    Notifications.clearLastNotificationResponse();
  }, [loading, user, lastNotificationResponse]);
};
