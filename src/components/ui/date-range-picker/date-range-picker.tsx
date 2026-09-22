import {
  DateRangePickerDialog,
  type DateRangeSelection,
} from "@expo/ui/jetpack-compose";
import { useState } from "react";
import { Host } from "../host";

interface DateRangePickerProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  value: DateRangeSelection;
  onChange: (range: DateRangeSelection) => void;
}

export const DateRangePicker = ({
  isVisible,
  setIsVisible,
  value,
  onChange,
}: DateRangePickerProps) => {
  const [range, setRange] = useState<DateRangeSelection>(value);

  if (isVisible)
    return (
      <Host matchContents>
        <DateRangePickerDialog
          initialStartDate={range.start?.toISOString()}
          initialEndDate={range.end?.toISOString()}
          onDateRangeSelected={(selectedRange) => {
            setRange(selectedRange);
            onChange(selectedRange);
            setIsVisible(false);
          }}
          onDismissRequest={() => setIsVisible(false)}
        />
      </Host>
    );

  return null;
};
