import { errorToast } from "@/utils/toast";
import {
  BottomSheetModal,
  BottomSheetView,
} from "@expo/ui/community/bottom-sheet";
import * as Updates from "expo-updates";
import { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { GhostButton, PrimaryButton } from "../ui/button";
import { FullScreenSpinner } from "../ui/full-screen-spinner";
import { ThemedText } from "../ui/themed-text";

type UpdateState =
  "idle" | "available" | "downloading" | "downloaded" | "error";

interface ErrorStateProps {
  handleRetry: () => void;
  closeSheet: () => void;
}

export const AppUpdateNotifier = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { isUpdateAvailable, isUpdatePending } = Updates.useUpdates();
  const [updateState, setUpdateState] = useState<UpdateState>("idle");

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  useEffect(() => {
    if (!isUpdateAvailable) return;

    setUpdateState("available");
    openSheet();
  }, [isUpdateAvailable, openSheet]);

  const downloadUpdate = useCallback(async () => {
    setUpdateState("downloading");

    closeSheet();

    try {
      const result = await Updates.fetchUpdateAsync();

      if (result.isNew) {
        setUpdateState("downloaded");

        setTimeout(() => {
          openSheet();
        }, 250);
      } else {
        setUpdateState("idle");
      }
    } catch (error) {
      errorToast({
        title:
          error instanceof Error
            ? error.message
            : "Failed to download the update",
      });

      setUpdateState("error");

      setTimeout(() => {
        openSheet();
      }, 250);
    }
  }, [closeSheet, openSheet]);

  useEffect(() => {
    if (!isUpdatePending) return;

    setUpdateState("downloaded");

    setTimeout(() => {
      openSheet();
    }, 250);
  }, [isUpdatePending, openSheet]);

  const handleRetry = useCallback(() => {
    downloadUpdate();
  }, [downloadUpdate]);

  const handleReload = useCallback(async () => {
    try {
      await Updates.reloadAsync();
    } catch (error) {
      errorToast({
        title: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  }, []);

  const isDownloading = updateState === "downloading";
  const isError = updateState === "error";
  const isDownloadAvailable = updateState === "available";
  const isDownloaded = updateState === "downloaded";

  return (
    <View pointerEvents="box-none">
      <FullScreenSpinner isVisible={isDownloading} />
      <BottomSheetModal ref={bottomSheetRef} enablePanDownToClose>
        <BottomSheetView>
          <View className="px-6 pb-8 pt-2">
            {isDownloadAvailable && (
              <UpdateAvailableState downloadUpdate={downloadUpdate} />
            )}
            {isError && (
              <ErrorState closeSheet={closeSheet} handleRetry={handleRetry} />
            )}
            {isDownloaded && <DownloadedState handleReload={handleReload} />}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

const ErrorState = ({ handleRetry, closeSheet }: ErrorStateProps) => {
  return (
    <View>
      <View className="mb-6 items-center">
        <View className="mb-5 h-16 w-16 items-center justify-center rounded-full bg-danger/10">
          <ThemedText className="text-3xl">!</ThemedText>
        </View>

        <ThemedText className="mb-2 text-center text-2xl font-bold text-foreground">
          Update failed
        </ThemedText>

        <ThemedText className="max-w-[320px] text-center leading-6 text-muted-foreground">
          We couldn't download the latest update. Please check your connection
          and try again.
        </ThemedText>
      </View>

      <PrimaryButton onPress={handleRetry}>
        <PrimaryButton.Label className="text-base font-semibold">
          Try again
        </PrimaryButton.Label>
      </PrimaryButton>

      <GhostButton
        onPress={closeSheet}
        className="mt-2 h-12 items-center justify-center"
      >
        <GhostButton.Label className="text-sm font-medium">
          Maybe later
        </GhostButton.Label>
      </GhostButton>
    </View>
  );
};

const DownloadedState = ({ handleReload }: { handleReload: () => void }) => {
  return (
    <View>
      <View className="mb-6 items-center">
        <View className="mb-5 h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <ThemedText className="text-3xl">✓</ThemedText>
        </View>

        <ThemedText className="mb-2 text-center text-2xl font-bold text-foreground">
          Update ready
        </ThemedText>

        <ThemedText className="max-w-[320px] text-center text-base leading-6 text-muted-foreground">
          The update has been downloaded successfully. Restart the app to apply
          the latest version.
        </ThemedText>
      </View>

      <PrimaryButton onPress={handleReload}>
        <PrimaryButton.Label className="text-base font-semibold">
          Restart app
        </PrimaryButton.Label>
      </PrimaryButton>

      <ThemedText className="mt-3 text-center text-xs text-muted-foreground">
        Make sure you have finished anything important before restarting.
      </ThemedText>
    </View>
  );
};

const UpdateAvailableState = ({
  downloadUpdate,
}: {
  downloadUpdate: () => void;
}) => {
  return (
    <View>
      <View className="mb-6 items-center">
        <View className="mb-5 h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <ThemedText className="text-3xl">✨</ThemedText>
        </View>

        <ThemedText className="mb-2 text-center text-2xl font-bold text-foreground">
          New update available
        </ThemedText>

        <ThemedText className="max-w-[320px] text-center text-base leading-6 text-muted-foreground">
          A new version of the app is ready. Download it now to get the latest
          features and improvements.
        </ThemedText>
      </View>

      <PrimaryButton onPress={downloadUpdate}>
        <PrimaryButton.Label className="text-base">
          Download update
        </PrimaryButton.Label>
      </PrimaryButton>

      <ThemedText className="mt-3 text-center text-xs text-muted-foreground">
        You can continue using the app after downloading.
      </ThemedText>
    </View>
  );
};
