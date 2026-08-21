import { useLanguage } from "@/hooks/use-language";
import {
  BottomSheetModal,
  BottomSheetScrollView,
} from "@expo/ui/community/bottom-sheet";
import { useCallback, useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import { twMerge } from "tailwind-merge";
import { SecondaryButton } from "../button";
import { StyledSymbolView } from "../symbol-view";
import { ThemedText } from "../themed-text";

interface SelectInputProps {
  options: { label: string; value: string; disabled?: boolean }[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

export const SelectInput = ({
  options,
  value,
  onValueChange,
  disabled = false,
  className,
  placeholder,
}: SelectInputProps) => {
  const { t } = useLanguage();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const selectedLabel = value
    ? options.find((o) => o.value === value)?.label
    : placeholder;

  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, [bottomSheetRef]);

  const handleOptionPress = useCallback(
    (item: { value: string }) => {
      onValueChange?.(item.value);
      closeSheet();
    },
    [onValueChange, closeSheet],
  );

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, [bottomSheetRef]);

  return (
    <>
      <SecondaryButton
        onPress={openSheet}
        disabled={disabled}
        className={className}
      >
        <SecondaryButton.Label className="text-foreground">
          {selectedLabel || t("select")}
        </SecondaryButton.Label>
        <StyledSymbolView
          name={{
            android: "unfold_more",
            ios: "arrow.up.and.down",
          }}
          tintColorClassName="accent-primary"
        />
      </SecondaryButton>
      <BottomSheetModal enablePanDownToClose ref={bottomSheetRef}>
        <BottomSheetScrollView contentContainerClassName="pb-safe-offset-12">
          <View className="px-4">
            {options.map((item) => {
              const isSelected = item.value === value;
              return (
                <TouchableOpacity
                  onPress={() => {
                    handleOptionPress(item);
                  }}
                  key={item.value}
                  disabled={item.disabled}
                  className={twMerge("py-4", item.disabled ? "opacity-50" : "")}
                >
                  <View className="flex-row items-center gap-1">
                    {isSelected && (
                      <StyledSymbolView
                        name={{
                          ios: "checkmark",
                          android: "check",
                        }}
                        size={20}
                        tintColorClassName={"accent-success"}
                      />
                    )}
                    <ThemedText
                      className={twMerge(
                        "text-base flex-1",
                        !item.disabled && isSelected
                          ? "font-medium text-success"
                          : "font-normal",
                        item.disabled ? "text-muted" : "",
                      )}
                    >
                      {item.label}
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};
