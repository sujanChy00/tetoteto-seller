import { Host } from "@/components/ui/host";
import { useAppTheme } from "@/context/app-theme-provider";
import {
  dateOnlyFormatter,
  formatShortDate,
  formatShortDateWithMonth,
} from "@/utils/date";
import { RNHostView, Text } from "@expo/ui";
import BottomSheet, { BottomSheetView } from "@expo/ui/community/bottom-sheet";
import { SymbolView } from "expo-symbols";
import { useCallback, useRef, useState } from "react";
import { View } from "react-native";
import DateTimePicker, {
  DatePickerBaseProps,
  DateType,
  useDefaultClassNames,
} from "react-native-ui-datepicker";
import { Button } from "../button";
import { Row } from "../row";

interface DateRangeType {
  endDate?: DateType;
  startDate?: DateType;
}

interface Props extends Omit<DatePickerBaseProps, "mode" | "onChange"> {
  value: DateRangeType;
  onChange: (data: DateRangeType) => void;
}

export const DateRangePicker = ({ onChange, value }: Props) => {
  const { currentTheme } = useAppTheme();
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
      <Host matchContents>
        <Button variant="elevated" onPress={onOpen}>
          <Text>
            {value.startDate && value.endDate
              ? `${formatShortDateWithMonth(new Date(value.startDate as string))} - ${formatShortDate(new Date(value.endDate as string))}`
              : "Select Date"}
          </Text>
        </Button>
      </Host>
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
              range_fill: "bg-primary/10",
              range_start_label: "text-white",
              range_end_label: "text-white",
              selected_month: "bg-primary rounded-full",
              selected_month_label: "text-white",
              selected_year: "bg-primary rounded-full",
              selected_year_label: "text-white",
            }}
            components={{
              MonthSelector: (props) => (
                <Host matchContents>
                  <Button onPress={props.onPress} variant="elevated">
                    <Text>{props.text}</Text>
                  </Button>
                </Host>
              ),
              YearSelector: (props) => (
                <Host matchContents>
                  <Button onPress={props.onPress} variant="elevated">
                    <Text>{props.year}</Text>
                  </Button>
                </Host>
              ),
              IconNext: (
                <Host matchContents>
                  <Button height={45} width={45} variant="outlined">
                    <RNHostView matchContents>
                      <SymbolView
                        name={{
                          ios: "chevron.right",
                          android: "chevron_right",
                        }}
                      />
                    </RNHostView>
                  </Button>
                </Host>
              ),
              IconPrev: (
                <Host matchContents>
                  <Button height={45} width={45} variant="outlined">
                    <RNHostView matchContents>
                      <SymbolView
                        name={{
                          ios: "chevron.left",
                          android: "chevron_left",
                        }}
                      />
                    </RNHostView>
                  </Button>
                </Host>
              ),
            }}
          />
          <Host style={{ width: "100%" }} matchContents={{ vertical: true }}>
            <Row alignment="center" fillFullWidth paddingHorizontal={16}>
              <Button variant="text" onPress={onClose}>
                <Text>Close</Text>
              </Button>
              <Button
                onPress={() => {
                  onChange(date);
                  onClose();
                }}
              >
                <Text>Done</Text>
              </Button>
            </Row>
          </Host>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};
