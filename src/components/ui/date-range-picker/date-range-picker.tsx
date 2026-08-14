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
import { Button } from "../button";

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
  const colorForeground = useCSSVariable(
    "--color-default-foreground",
  ) as string;
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
      <Button.Secondary onPress={onOpen} className="h-8.75 px-3">
        <Button.SecondaryLabel>
          {value.startDate && value.endDate
            ? `${formatShortDate(new Date(value.startDate as string))} - ${formatShortDate(new Date(value.endDate as string))}`
            : "Select Date"}
        </Button.SecondaryLabel>
      </Button.Secondary>
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
                <Button.Secondary
                  onPress={props.onPress}
                  className="h-10 px-6 shadow"
                >
                  <Button.SecondaryLabel>{props.text}</Button.SecondaryLabel>
                </Button.Secondary>
              ),
              YearSelector: (props) => (
                <Button.Secondary
                  onPress={props.onPress}
                  className="h-10 px-6 shadow"
                >
                  <Button.SecondaryLabel>{props.year}</Button.SecondaryLabel>
                </Button.Secondary>
              ),
              IconNext: (
                <Button.Outline className="rounded-full size-11.25">
                  <SymbolView
                    tintColor={colorForeground}
                    name={{
                      ios: "chevron.right",
                      android: "chevron_right",
                    }}
                  />
                </Button.Outline>
              ),
              IconPrev: (
                <Button.Outline className="rounded-full size-11.25">
                  <SymbolView
                    tintColor={colorForeground}
                    name={{
                      ios: "chevron.left",
                      android: "chevron_left",
                    }}
                  />
                </Button.Outline>
              ),
            }}
          />
          <View className="flex-row w-full items-center gap-3 px-4 justify-between pt-6">
            <Button.Ghost className="flex-1" onPress={onClose}>
              <Button.GhostLabel>Close</Button.GhostLabel>
            </Button.Ghost>
            <Button.Primary
              className="flex-1"
              onPress={() => {
                onChange(date);
                onClose();
              }}
            >
              <Button.PrimaryLabel>Done</Button.PrimaryLabel>
            </Button.Primary>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};
