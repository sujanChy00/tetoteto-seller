import { ChatActions } from "@/components/chat/chat-actions";
import { ChatFetchingIndicator } from "@/components/chat/chat-fetching-indicator";
import { ChatList } from "@/components/chat/chat-list";
// import { IOSGlassButton } from "@/components/ui/ios-glass-button";
import { useGetUserMessagesById } from "@/queries/chat-query";
import SHOPPING_BAG_ICON from "@expo/material-symbols/local_mall.xml";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { twMerge } from "tailwind-merge";

const ChatDetailScreen = () => {
  const router = useRouter();
  const { userId } = useLocalSearchParams<{
    userId: string;
  }>();
  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetUserMessagesById(Number(userId));
  const { messages, canReply, user } = useMemo(() => {
    const firstPage = data?.pages[0];
    return {
      messages: data ? data.pages.flatMap((p) => p.content).toReversed() : [],
      canReply: firstPage?.canReply,
      user: firstPage?.user,
    };
  }, [data]);

  return (
    <View className="flex-1">
      <Stack.Title>{isPending ? "Loading..." : user?.name}</Stack.Title>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          onPress={() => {
            router.push({
              pathname: "/user-orders/[userId]",
              params: {
                userId,
              },
            });
          }}
        >
          <Stack.Toolbar.Label>orders</Stack.Toolbar.Label>
          <Stack.Toolbar.Icon sf="cart" src={SHOPPING_BAG_ICON} />
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
      <ChatFetchingIndicator visible={isFetchingNextPage && hasNextPage} />
      <ChatList
        isPending={isPending}
        messages={messages}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
      <KeyboardStickyView
        offset={{
          closed: 0,
          opened: 15,
        }}
      >
        <View
          className={twMerge(
            "p-2 pb-safe-offset-6",
            canReply ? "bg-background" : "",
          )}
        >
          <ChatActions isPending={isPending} canReply={canReply ?? true} />
        </View>
      </KeyboardStickyView>
    </View>
  );
};

export default ChatDetailScreen;
