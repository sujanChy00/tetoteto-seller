import { IChatMessage } from "@/types";
import { LegendList, type LegendListRef } from "@legendapp/list/react-native";
import { forwardRef, useCallback } from "react";
import { ScrollViewProps, View } from "react-native";
import { PendingComponent } from "../layout/pending-component";
import { VirtualizedListScrollView } from "../layout/virtualized-list-scroll-view";
import { ListSeparator } from "../ui/list/list-separator";
import { StyledSymbolView } from "../ui/symbol-view";
import { ThemedText } from "../ui/themed-text";
import { ChatMessage } from "./chat-message";

interface Props {
  messages: IChatMessage[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  isPending: boolean;
}

const renderSeparator = () => <ListSeparator className="h-5" />;

export const ChatList = forwardRef<LegendListRef, Props>(
  (
    { messages, hasNextPage, isFetchingNextPage, fetchNextPage, isPending },
    ref,
  ) => {
    const renderItem = useCallback(
      ({ item }: { item: IChatMessage }) => <ChatMessage item={item} />,
      [],
    );
    const keyExtractor = useCallback(
      ({ id }: IChatMessage) => id.toString(),
      [],
    );
    const onStartReached = useCallback(() => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
    const getItemType = useCallback(({ text, image, item }: IChatMessage) => {
      if (item) return "item";
      if (image) return "image";
      if (text) return "text";
      return "empty";
    }, []);
    const memoList = useCallback(
      (props: ScrollViewProps) => <VirtualizedListScrollView {...props} />,
      [],
    );

    if (isPending) return <PendingComponent />;
    if (messages.length === 0)
      return (
        <View className="flex-1 items-center justify-center gap-3">
          <StyledSymbolView
            size={50}
            name={{ android: "sms", ios: "message" }}
          />
          <ThemedText className="italic text-center text-base">
            Start a conversation
          </ThemedText>
        </View>
      );

    return (
      <LegendList
        ref={ref}
        showsVerticalScrollIndicator={false}
        data={messages}
        getItemType={getItemType}
        recycleItems
        renderItem={renderItem}
        maintainVisibleContentPosition
        scrollEventThrottle={16}
        onStartReachedThreshold={0.05}
        contentContainerClassName="p-2"
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={keyExtractor}
        onStartReached={onStartReached}
        renderScrollComponent={memoList}
        alignItemsAtEnd
        estimatedItemSize={80}
        initialScrollAtEnd
      />
    );
  },
);
ChatList.displayName = "ChatList";
