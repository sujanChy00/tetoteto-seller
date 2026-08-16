import { useAppTheme } from "@/context/app-theme-provider";
import { dateOnlyFormatter, formatShortDate } from "@/utils/date";
import BottomSheet, { BottomSheetView } from "@expo/ui/community/bottom-sheet";
import { SymbolView } from "expo-symbols";
import { useCallback, useRef, useState } from "react";
import { View } from "react-native";
import DateTimePicker, {
  DatePickerBaseProps,
  DateType,
  useDefaultClassNames,
} from "react-native-ui-datepicker";
import { useCSSVariable } from "uniwind";
import {
  GhostButton,
  OutlineButton,
  PrimaryButton,
  SecondaryButton,
} from "../button";

interface DateRangeType {
  endDate?: DateType;
  startDate?: DateType;
}

interface Props extends Omit<DatePickerBaseProps, "mode" | "onChange"> {
  value: DateRangeType;
  onChange: (data: DateRangeType) => void;
}

export const DateRangePicker = ({ onChange, value }: Props) => {
  const { isDark } = useAppTheme();
  const primaryColor = useCSSVariable("--color-primary") as string;
  const sheetRef = useRef<BottomSheet>(null);
  const defaultClassNames = useDefaultClassNames();
  const [date, setDate] = useState<DateRangeType>({
    startDate: value.startDate
      ? dateOnlyFormatter(new Date(value.startDate as string))
      : undefined,
    endDate: value.endDate
      ? dateOnlyFormatter(new Date(value.endDate as string))
      : undefined,
  });

  const onOpen = useCallback(() => {
    sheetRef.current?.snapToIndex(0);
  }, []);
  const onClose = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return (
    <View>
      <SecondaryButton onPress={onOpen} className="h-8.75 px-3">
        <SecondaryButton.Label>
          {value.startDate && value.endDate
            ? `${formatShortDate(new Date(value.startDate as string))} - ${formatShortDate(new Date(value.endDate as string))}`
            : "Select Date"}
        </SecondaryButton.Label>
      </SecondaryButton>
      <BottomSheet ref={sheetRef} index={-1} enablePanDownToClose>
        <BottomSheetView>
          <DateTimePicker
            mode="range"
            endDate={date?.endDate}
            startDate={date?.startDate}
            onChange={setDate}
            classNames={{
              ...defaultClassNames,
              selected: "bg-primary rounded-full",
              selected_label: "text-white",
              today: "bg-muted/40 rounded-full",
              today_label: "text-white",
              range_end: "bg-primary",
              range_start: "bg-primary",
              range_fill: isDark ? "bg-primary/20" : "bg-primary/10",
              range_start_label: "text-white",
              range_end_label: "text-white",
              selected_month: "bg-primary rounded-full",
              selected_month_label: "text-white",
              selected_year: "bg-primary rounded-full",
              selected_year_label: "text-white",
              range_middle_label: isDark ? "text-white" : "text-black",
              weekday_label: isDark ? "text-white" : "text-black",
            }}
            components={{
              MonthSelector: (props) => (
                <OutlineButton onPress={props.onPress} className="h-10 px-6">
                  <OutlineButton.Label>{props.text}</OutlineButton.Label>
                </OutlineButton>
              ),
              YearSelector: (props) => (
                <OutlineButton onPress={props.onPress} className="h-10 px-6">
                  <OutlineButton.Label>{props.year}</OutlineButton.Label>
                </OutlineButton>
              ),
              IconNext: (
                <View className="rounded-full items-center justify-center size-10">
                  <SymbolView
                    tintColor={primaryColor}
                    name={{
                      ios: "chevron.right",
                      android: "chevron_right",
                    }}
                  />
                </View>
              ),
              IconPrev: (
                <View className="rounded-full items-center justify-center size-10">
                  <SymbolView
                    tintColor={primaryColor}
                    name={{
                      ios: "chevron.left",
                      android: "chevron_left",
                    }}
                  />
                </View>
              ),
            }}
          />
          <View className="flex-row w-full items-center gap-3 px-4 justify-between pt-6 pb-3">
            <GhostButton className="flex-1" onPress={onClose}>
              <GhostButton.Label>Close</GhostButton.Label>
            </GhostButton>
            <PrimaryButton
              className="flex-1"
              onPress={() => {
                onChange(date);
                onClose();
              }}
            >
              <PrimaryButton.Label>Done</PrimaryButton.Label>
            </PrimaryButton>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};
