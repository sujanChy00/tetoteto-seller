import { IMessageInput } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { AnimatedView } from "../ui/animated-view";
import { PrimaryButton } from "../ui/button";
import { StyledSymbolView } from "../ui/symbol-view";
import { ThemedText } from "../ui/themed-text";
import { ChatImageSender } from "./chat-image-sender";
import { ChatItemSelector } from "./chat-item-selector";

interface Props {
  canReply: boolean;
  isPending: boolean;
  onSendMessage: (data: IMessageInput) => void;
}

export const ChatActions = ({ canReply, isPending, onSendMessage }: Props) => {
  const { userId, orderId } = useLocalSearchParams<{
    userId: string;
    orderId?: string;
  }>();
  const [text, setText] = useState("");

  if (!isPending && !canReply)
    return (
      <AnimatedView
        key="no-reply"
        entering={FadeInUp.duration(220)}
        exiting={FadeOutDown.duration(180)}
        className="py-1"
      >
        <ThemedText className="text-center text-danger italic">
          You can't reply to this chat
        </ThemedText>
      </AnimatedView>
    );

  return (
    <AnimatedView
      key="chat-input"
      exiting={FadeOutDown.duration(180)}
      className="flex-row items-center gap-1"
    >
      <View className="flex-row items-center flex-1 bg-surface-secondary rounded-3xl pl-2">
        <ChatImageSender onSendMessage={onSendMessage} disabled={isPending} />
        {!!orderId && (
          <ChatItemSelector
            onSendMessage={onSendMessage}
            disabled={isPending}
          />
        )}
        <TextInput
          value={text}
          onChangeText={setText}
          editable={!isPending}
          className="flex-1 rounded-3xl text-foreground"
          multiline
          placeholder={isPending ? "please wait..." : "Your message here..."}
        />
      </View>
      <PrimaryButton
        onPress={() => {
          onSendMessage({ userId: Number(userId), text: text.trim() });
          setText("");
        }}
        disabled={isPending}
        className="self-end"
        pointerEvents={isPending ? "none" : "auto"}
      >
        <StyledSymbolView
          tintColorClassName="accent-primary-foreground"
          name={{ android: "arrow_right_alt", ios: "arrow.right" }}
        />
      </PrimaryButton>
    </AnimatedView>
  );
};
