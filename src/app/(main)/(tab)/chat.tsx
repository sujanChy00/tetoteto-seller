import { MessageCard } from "@/components/chat/message-card";
import { ListEmpty } from "@/components/ui/list/list-empty";
import { ListFetchingMore } from "@/components/ui/list/list-fetching-more";
import { ListSeparator } from "@/components/ui/list/list-separator";
import { ThemedText } from "@/components/ui/themed-text";
import { useRefreshOnFocus } from "@/hooks/use-refetch-onfocus";
import { useGetMessages } from "@/queries/chat-query";
import { IChat } from "@/types";
import { LegendList } from "@legendapp/list/react-native";
import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";

const renderSeparator = () => <ListSeparator />;
const listHeaderComponent = () => (
  <View className="pb-6">
    <ThemedText className="text-4xl">Messages</ThemedText>
  </View>
);

const ChatScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const {
    data,
    hasNextPage,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
    isPending,
  } = useGetMessages({ size: 20 });
  useRefreshOnFocus(refetch);

  const messages = useMemo(
    () => (data ? data.pages.flatMap((chat) => chat.content) : []),
    [data],
  );

  const keyExtractor = useCallback(({ id }: IChat) => id.toString(), []);
  const ListEmptyComponent = useCallback(
    () => (
      <ListEmpty
        isPending={isPending}
        className="pt-40"
        emptyStateMessage="no_message_availabe_for_this_shop"
      />
    ),
    [isPending],
  );

  const ListFooterComponent = useCallback(
    () => (
      <ListFetchingMore
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    ),
    [isFetchingNextPage, hasNextPage],
  );

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const renderItem = useCallback(
    ({ item }: { item: IChat }) => <MessageCard data={item} />,
    [],
  );

  return (
    <LegendList
      recycleItems
      maintainVisibleContentPosition
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pt-safe-offset-20 px-2"
      drawDistance={500}
      keyboardDismissMode="on-drag"
      ListHeaderComponent={listHeaderComponent}
      onEndReachedThreshold={0.5}
      data={messages}
      estimatedItemSize={142}
      ItemSeparatorComponent={renderSeparator}
      renderItem={renderItem}
      refreshing={refreshing}
      keyExtractor={keyExtractor}
      onRefresh={onRefresh}
      ListEmptyComponent={ListEmptyComponent}
      onEndReached={onEndReached}
      ListFooterComponent={ListFooterComponent}
      experimental_adaptiveRender={{
        enterVelocity: 6,
        exitVelocity: 3,
        exitDelay: 250,
      }}
    />
  );
};

export default ChatScreen;
