import { ChatActions } from "@/components/chat/chat-actions";
import { ChatFetchingIndicator } from "@/components/chat/chat-fetching-indicator";
import { ChatList } from "@/components/chat/chat-list";
import { ThemedText } from "@/components/ui/themed-text";
import { useGetUserMessagesById } from "@/queries/chat-query";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { twMerge } from "tailwind-merge";

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
    <View className="flex-1">
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
