import { ChatActions } from "@/components/chat/chat-actions";
import { ChatFetchingIndicator } from "@/components/chat/chat-fetching-indicator";
import { ChatList } from "@/components/chat/chat-list";
import { useSendMessage } from "@/mutation/chat-mutation";
// import { IOSGlassButton } from "@/components/ui/ios-glass-button";
import { useGetUserMessagesById } from "@/queries/chat-query";
import { IMessageInput } from "@/types";
import SHOPPING_BAG_ICON from "@expo/material-symbols/local_mall.xml";
import { LegendListRef } from "@legendapp/list/react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useRef } from "react";
import { View } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { twMerge } from "tailwind-merge";

const ChatDetailScreen = () => {
  const router = useRouter();
  const listRef = useRef<LegendListRef>(null);
  const { mutate: sendMessage } = useSendMessage();
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetUserMessagesById(Number(userId));

  const { messages, canReply, user } = useMemo(() => {
    const firstPage = data?.pages[0];
    const flat = data ? data.pages.flatMap((p) => p.content) : [];
    const seen = new Set<string | number>();
    const deduped = flat.filter((msg) => {
      if (seen.has(msg.id)) return false;
      seen.add(msg.id);
      return true;
    });
    return {
      messages: deduped.toReversed(),
      canReply: firstPage?.canReply,
      user: firstPage?.user,
    };
  }, [data]);

  const handleSendMessage = (data: IMessageInput) => {
    sendMessage(data);
  };
  return (
    <View className="flex-1">
      <Stack.Title>{isPending ? "Loading..." : user?.name}</Stack.Title>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          onPress={() =>
            router.push({
              pathname: "/user-orders/[userId]",
              params: { userId },
            })
          }
        >
          <Stack.Toolbar.Label>orders</Stack.Toolbar.Label>
          <Stack.Toolbar.Icon sf="cart" src={SHOPPING_BAG_ICON} />
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
      <ChatFetchingIndicator visible={isFetchingNextPage && hasNextPage} />
      <ChatList
        ref={listRef}
        isPending={isPending}
        messages={messages}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
      <KeyboardStickyView
        offset={{
          opened: 16,
        }}
      >
        <View
          className={twMerge(
            "p-2 pb-safe-offset-6",
            canReply ? "bg-background" : "",
          )}
        >
          <ChatActions
            onSendMessage={handleSendMessage}
            isPending={isPending}
            canReply={canReply ?? true}
          />
        </View>
      </KeyboardStickyView>
    </View>
  );
};
export default ChatDetailScreen;
