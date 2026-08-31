import { isAndroid } from "@/constants/platform";
import { IChatMessage } from "@/types";
import { type LegendListRef } from "@legendapp/list/react-native";
import { ComponentRef, forwardRef, useCallback, useRef } from "react";
import { ScrollViewProps, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
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

type ChatListRef = ComponentRef<typeof Animated.FlatList>;

const renderSeparator = () => <ListSeparator className="h-5" />;

export const ChatList = forwardRef<ChatListRef, Props>(
  (
    { messages, hasNextPage, isFetchingNextPage, fetchNextPage, isPending },
    ref,
  ) => {
    const isBulkLoadRef = useRef(false);

    const renderItem = useCallback(
      ({ item }: { item: IChatMessage }) => <ChatMessage item={item} />,
      [],
    );
    const keyExtractor = useCallback(
      ({ id }: IChatMessage) => id.toString(),
      [],
    );

    const onEndReached = useCallback(() => {
      if (hasNextPage && !isFetchingNextPage) {
        isBulkLoadRef.current = true;
        fetchNextPage();
      }
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
      <Animated.FlatList
        ref={ref}
        itemLayoutAnimation={LinearTransition}
        showsVerticalScrollIndicator={false}
        data={messages}
        renderItem={renderItem}
        initialNumToRender={15}
        maxToRenderPerBatch={5}
        windowSize={12}
        updateCellsBatchingPeriod={30}
        removeClippedSubviews={isAndroid}
        scrollEventThrottle={16}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ padding: 8 }}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        inverted
        renderScrollComponent={memoList}
      />
    );
  },
);
ChatList.displayName = "ChatList";
