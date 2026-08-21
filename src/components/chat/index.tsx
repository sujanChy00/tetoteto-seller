import { IChatMessage } from "@/types";
import { formatChatDate } from "@/utils/format-chat-date";
import { Link } from "expo-router";
import { memo } from "react";
import { Pressable, View } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { twMerge } from "tailwind-merge";
import { AnimatedView } from "../ui/animated-view";
import { StyledImage } from "../ui/image";
import { ThemedText } from "../ui/themed-text";

interface Props {
  chat: IChatMessage;
  isCustomer: boolean;
  className?: string;
  onLongPress?: (type?: "text" | "image" | "item") => void;
}

const Text = memo(({ className, chat, isCustomer, onLongPress }: Props) => {
  if (!chat?.text) return null;
  return (
    <Pressable
      hitSlop={10}
      onLongPress={() => onLongPress?.("text")}
      className={twMerge(
        "items-center relative",
        !isCustomer ? "self-start flex-row-reverse" : "self-end flex-row",
      )}
    >
      <View
        className={twMerge(
          "rounded-2xl p-2 max-w-[85%]",
          className,
          !isCustomer
            ? " rounded-bl-none bg-surface-secondary"
            : "text-right rounded-br-none bg-primary",
        )}
      >
        <ThemedText selectable className={isCustomer ? "text-white" : ""}>
          {chat?.text}
        </ThemedText>
      </View>
    </Pressable>
  );
});

const Image = memo(({ className, chat, isCustomer, onLongPress }: Props) => {
  if (!chat?.image) return null;
  return (
    <Link
      asChild
      href={{
        pathname: "/image/[image]",
        params: {
          image: chat.image,
        },
      }}
    >
      <Pressable
        className={twMerge(
          "items-center relative",
          !isCustomer ? "self-start flex-row-reverse" : "self-end flex-row",
          className,
        )}
        onLongPress={() => onLongPress?.("image")}
      >
        <StyledImage
          alt={chat.text}
          source={{ uri: chat.image }}
          className="size-20 object-contain"
        />
      </Pressable>
    </Link>
  );
});

const Item = memo(({ className, chat, isCustomer, onLongPress }: Props) => {
  if (!chat?.item) return null;
  return (
    <Link
      asChild
      href={{
        pathname: "/item/[itemId]",
        params: {
          itemId: chat.item.itemId.toString(),
        },
      }}
    >
      <Pressable
        className={twMerge(
          "items-center relative",
          !isCustomer ? "self-start flex-row-reverse" : "self-end flex-row",
          className,
        )}
        onLongPress={() => onLongPress?.("item")}
      >
        <View
          className={twMerge(
            "items-center bg-surface p-1.5 rounded-xl",
            className,
          )}
        >
          <StyledImage
            className="size-20 object-contain"
            alt={chat?.item?.itemName}
            source={{
              uri: chat?.item?.itemPhotoUrl,
            }}
          />
          <ThemedText className="text-xs font-medium text-danger">
            ¥{chat?.item?.itemPriceBeforeTax.toLocaleString()}
          </ThemedText>
          <ThemedText className="max-w-24 text-muted text-sm" numberOfLines={1}>
            {chat?.item?.itemName}
          </ThemedText>
        </View>
      </Pressable>
    </Link>
  );
});

const Status = memo(
  ({ className, chat, isCustomer: isCustomerProp }: Props) => {
    const isCustomer = isCustomerProp ?? (!chat.admin && !chat.user);

    return (
      <View
        className={twMerge(!isCustomer ? "self-start" : "self-end", className)}
      >
        {chat?.sending ? (
          <AnimatedView exiting={FadeOut}>
            <ThemedText className="text-[10px] text-muted italic text-right">
              sending...
            </ThemedText>
          </AnimatedView>
        ) : (
          <AnimatedView entering={FadeIn}>
            <ThemedText className="text-[10px] text-muted italic text-right">
              {formatChatDate(chat?.createdAt)}
            </ThemedText>
          </AnimatedView>
        )}

        {isCustomer && !!chat?.seenAt && (
          <ThemedText className="text-[10px] text-success text-right">
            seen
          </ThemedText>
        )}
      </View>
    );
  },
);

export const Chat = {
  Text,
  Image,
  Item,
  Status,
};
