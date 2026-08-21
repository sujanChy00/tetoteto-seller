import { useHaptics } from "@/hooks/use-haptics";
import { useDeleteMessage } from "@/mutation/chat-mutation";
import { IChatMessage } from "@/types";
import * as Clipboard from "expo-clipboard";
import { memo, useCallback } from "react";
import { Alert, View } from "react-native";
import { twMerge } from "tailwind-merge";
import { Chat } from ".";
import { ChatAdminLabel } from "./chat-message-admin-label";

interface ChatMessageProps {
  item: IChatMessage;
}
export const ChatMessage = memo(({ item }: ChatMessageProps) => {
  const isCustomer = !item.admin && !item.user;
  const haptics = useHaptics();
  const { mutate: deleteMessage } = useDeleteMessage();

  const onLongPress = useCallback(
    (type?: "text" | "image" | "item") => {
      if (!isCustomer) return;
      haptics("impact-medium");

      Alert.alert(
        "Delete message",
        type === "text"
          ? "Choose an action to perform"
          : "This message will be deleted for everyone.",
        [
          { text: "Cancel", style: "cancel" },
          ...(type === "text"
            ? [
                {
                  text: "Copy",
                  onPress: () => Clipboard.setStringAsync(item.text ?? ""),
                },
              ]
            : []),
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              deleteMessage(item.id);
            },
          },
        ],
        { cancelable: true },
      );
    },
    [item.id, deleteMessage],
  );

  return (
    <View
      className={twMerge(
        "gap-0.5 relative",
        isCustomer ? "items-end" : "items-start",
      )}
    >
      <ChatAdminLabel isCustomer={isCustomer} isAdmin={item.admin} />
      <View className="gap-5">
        <Chat.Text
          chat={item}
          isCustomer={isCustomer}
          onLongPress={onLongPress}
        />
        <Chat.Image
          onLongPress={onLongPress}
          chat={item}
          isCustomer={isCustomer}
        />
        <Chat.Item
          onLongPress={onLongPress}
          chat={item}
          isCustomer={isCustomer}
        />
      </View>
      <Chat.Status chat={item} isCustomer={isCustomer} />
    </View>
  );
});
