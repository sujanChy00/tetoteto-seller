import { useSendMessage } from "@/mutation/chat-mutation";
import { useGetOrderById } from "@/queries/order-query";
import { ChatItem, ITransactionById } from "@/types";
import { getAvatarName } from "@/utils/avatar-name";
import {
  BottomSheetModal,
  BottomSheetScrollView,
} from "@expo/ui/community/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import { Fragment, useCallback, useRef, useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { twMerge } from "tailwind-merge";
import { Avatar } from "../ui/avatar";
import { ListGroup } from "../ui/list-group";
import { StyledSymbolView } from "../ui/symbol-view";
import { ThemedText } from "../ui/themed-text";

interface Props {
  disabled?: boolean;
  className?: string;
}

export const ChatItemSelector = ({ disabled, className }: Props) => {
  const { mutate: sendMessage } = useSendMessage();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [opened, setOpend] = useState(false);
  const { userId, orderId } = useLocalSearchParams<{
    userId: string;
    orderId?: string;
  }>();
  const { data: order, isPending } = useGetOrderById({
    id: Number(orderId),
    enabled: !!orderId && opened,
  });

  const onOpen = useCallback(() => {
    if (!bottomSheetRef.current) return;
    bottomSheetRef.current.present();
    setOpend(true);
  }, []);

  const onClose = useCallback(() => {
    if (!bottomSheetRef.current) return;
    bottomSheetRef.current.close();
    setOpend(false);
  }, []);

  const onItemSend = (item: Partial<ChatItem>) => {
    sendMessage({
      userId: Number(userId),
      item: {
        itemId: item.itemId,
        itemPhotoUrl: item.itemPhotoUrl,
        itemName: item.itemName,
        itemPriceBeforeTax: item.itemPriceBeforeTax,
      },
      itemId: item.itemId,
    });
    onClose();
  };

  return (
    <>
      <Pressable
        hitSlop={10}
        disabled={disabled}
        onPress={onOpen}
        className={twMerge(
          "h-12 w-8 items-center self-end justify-center rounded-full",
          className,
        )}
      >
        <StyledSymbolView
          tintColorClassName="accent-foreground"
          name={{
            android: "view_cozy",
            ios: "square.grid.2x2",
          }}
        />
      </Pressable>
      <BottomSheetModal ref={bottomSheetRef} enablePanDownToClose>
        <BottomSheetScrollView
          contentContainerClassName="pb-safe-offset-12"
          showsVerticalScrollIndicator={false}
        >
          <ItemsList
            onItemSend={onItemSend}
            isPending={isPending}
            order={order}
          />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};

const ItemsList = ({
  isPending,
  order,
  onItemSend,
}: {
  isPending: boolean;
  order?: ITransactionById;
  onItemSend: (item: Partial<ChatItem>) => void;
}) => {
  if (isPending)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={"small"} />
      </View>
    );
  if (!order || order.items.length === 0)
    return (
      <View className="flex-1 items-center justify-center">
        <ThemedText className="text-center">No items found</ThemedText>
      </View>
    );
  return (
    <ListGroup className="p-4">
      <ListGroup.Body>
        {order.items.map((item, index) => {
          const isLast = index === order.items.length - 1;
          return (
            <Fragment key={item.id}>
              <ListGroup.Item
                onPress={() =>
                  onItemSend({
                    itemId: item.id,
                    itemPhotoUrl: item.thumbnailImage,
                    itemName: item.name,
                    itemPriceBeforeTax: item.price,
                  })
                }
              >
                <ListGroup.ItemPrefix>
                  <Avatar.Image
                    source={item.thumbnailImage}
                    alt={item.name}
                    contentFit="cover"
                  />
                  <Avatar.Fallback source={item.thumbnailImage}>
                    {getAvatarName(item.name)}
                  </Avatar.Fallback>
                </ListGroup.ItemPrefix>
                <ListGroup.ItemContent>
                  <ListGroup.ItemTitle numberOfLines={1}>
                    {item.name}
                    asdklfnldkgjbldfgbsljdfgbsdfjgbsgfkjbsdkgfjsdkgfjhb
                  </ListGroup.ItemTitle>
                </ListGroup.ItemContent>
                <ListGroup.ItemSuffix className="self-end">
                  <ThemedText className="font-medium text-primary text-right">
                    ¥{item.totalPriceBeforeTax?.toLocaleString()}
                  </ThemedText>
                  <ThemedText className="text-muted text-right">
                    {item.price?.toLocaleString()} (with tax)
                  </ThemedText>
                </ListGroup.ItemSuffix>
              </ListGroup.Item>
              {!isLast && <ListGroup.ItemSeparator />}
            </Fragment>
          );
        })}
      </ListGroup.Body>
    </ListGroup>
  );
};
