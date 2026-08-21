import { ChatActions } from "@/components/chat/chat-actions";
import { ChatFetchingIndicator } from "@/components/chat/chat-fetching-indicator";
import { ChatList } from "@/components/chat/chat-list";
import { AvoidKeyboard } from "@/components/ui/avoid-keyboard";
import { ThemedText } from "@/components/ui/themed-text";
import { useGetUserMessagesById } from "@/queries/chat-query";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";

const ChatDetailScreen = () => {
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
    <View className="flex-1 pb-safe-offset-6">
      <Stack.Screen
        options={{
          title: isPending ? "Loading..." : (user?.name ?? "Chat Detail"),
          headerRight: () =>
            isPending ? null : (
              <Link
                href={{
                  pathname: "/user-orders/[userId]",
                  params: {
                    userId,
                  },
                }}
                asChild
              >
                <TouchableOpacity hitSlop={10}>
                  <ThemedText>orders</ThemedText>
                </TouchableOpacity>
              </Link>
            ),
        }}
      />
      <ChatFetchingIndicator visible={isFetchingNextPage && hasNextPage} />
      <ChatList
        isPending={isPending}
        messages={messages}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
      <View className="px-2">
        <ChatActions isPending={isPending} canReply={canReply ?? true} />
        <AvoidKeyboard />
      </View>
    </View>
  );
};

export default ChatDetailScreen;
