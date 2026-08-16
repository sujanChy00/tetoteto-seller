import { useEffect, useRef } from "react";
import { ScrollView } from "react-native";
import { useIsKeyboardVisible } from "./use-keyboard-visible";

export const useScrollToBottomOnKeyboardVisible = () => {
  const isKeyboardVisible = useIsKeyboardVisible();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!scrollViewRef.current) return;
    if (isKeyboardVisible) {
      scrollViewRef.current.scrollToEnd();
    }
  }, [isKeyboardVisible]);

  return { scrollViewRef };
};
