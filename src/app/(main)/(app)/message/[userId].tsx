import { ChatActions } from "@/components/chat/chat-actions";
import { ChatFetchingIndicator } from "@/components/chat/chat-fetching-indicator";
import { ChatList } from "@/components/chat/chat-list";
import { IOSGlassButton } from "@/components/ui/ios-glass-button";
import { StyledSymbolView } from "@/components/ui/symbol-view";
import { ThemedText } from "@/components/ui/themed-text";
import { useGetUserMessagesById } from "@/queries/chat-query";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { twMerge } from "tailwind-merge";

const ORDER_BUTTON = Platform.select({
  android: (
    <TouchableOpacity hitSlop={10}>
      <View className="flex-row items-center gap-1">
        <ThemedText className="text-primary">orders</ThemedText>
        <StyledSymbolView
          size={16}
          tintColorClassName="accent-primary"
          name={{
            android: "arrow_right_alt",
          }}
        />
      </View>
    </TouchableOpacity>
  ),
  ios: <IOSGlassButton label="orders" size="small" />,
});

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
                {ORDER_BUTTON}
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
