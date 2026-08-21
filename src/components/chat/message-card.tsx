import { IChat } from "@/types";
import { getAvatarName } from "@/utils/avatar-name";
import { formatChatDate } from "@/utils/format-chat-date";
import { Link } from "expo-router";
import { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import { twMerge } from "tailwind-merge";
import { Avatar } from "../ui/avatar";
import { Indicator } from "../ui/indicator";
import { ThemedText } from "../ui/themed-text";

export const MessageCard = memo(({ data }: { data: IChat }) => {
  const isUser = data.sender === "user";
  const isAdmin = data.sender === "admin";
  const isShop = data.sender === "shop";

  const isNotSeen = !data.seenAt && isUser;
  return (
    <Link
      asChild
      href={{
        pathname: "/message/[userId]",
        params: {
          userId: data.user.id,
        },
      }}
    >
      <TouchableOpacity className="py-1">
        <View className="flex-row items-center justify-between gap-3">
          <View className="flex-row items-center gap-3 flex-1">
            <Avatar>
              <Avatar.Fallback source={""}>
                {getAvatarName(data.user.name)}
              </Avatar.Fallback>
            </Avatar>
            <View className="flex-1">
              <ThemedText
                className={twMerge(
                  "flex-1 text-lg",
                  isNotSeen
                    ? "font-semibold text-foreground"
                    : "text-muted font-medium",
                )}
                numberOfLines={1}
              >
                {data.user.name}
              </ThemedText>
              <ThemedText
                numberOfLines={1}
                className={twMerge(
                  "flex-1 text-sm",
                  isNotSeen ? "font-medium text-foreground" : "text-muted",
                )}
              >
                {isShop ? "you:" : isAdmin && "Admin: "} {data.message}
              </ThemedText>
            </View>
          </View>
          <View className="self-end">
            {isNotSeen && (
              <Indicator className="self-end size-2.5" variant="primary" />
            )}
            <ThemedText className="text-[10px] text-muted italic">
              {formatChatDate(data.createdAt)}
            </ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
});
