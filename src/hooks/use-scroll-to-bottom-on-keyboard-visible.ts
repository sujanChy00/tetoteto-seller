import { useEffect, useRef } from "react";
import { ScrollView } from "react-native";
import { useKeyboard } from "./use-keyboard";

export const useScrollToBottomOnKeyboardVisible = () => {
  const { isKeyboardVisible } = useKeyboard();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!scrollViewRef.current) return;
    if (isKeyboardVisible) {
      scrollViewRef.current.scrollToEnd();
    }
  }, [isKeyboardVisible]);

  return { scrollViewRef };
};
