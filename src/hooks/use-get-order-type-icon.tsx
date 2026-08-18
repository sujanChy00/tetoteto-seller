import { SymbolView } from "expo-symbols";
import { JSX } from "react/jsx-runtime";
import { useCSSVariable } from "uniwind";

export const useGetOrderTypeIcon = () => {
  const [colorWarning, colorSuccess, colorPrimary] = useCSSVariable([
    "--color-warning",
    "--color-success",
    "--color-primary",
  ]);

  const transactionTypeIcon: Record<string, JSX.Element> = {
    cool: (
      <SymbolView
        tintColor={colorSuccess as string}
        name={{
          android: "thermostat",
          ios: "thermometer.high",
        }}
        size={12}
      />
    ),
    dry: (
      <SymbolView
        tintColor={colorWarning as string}
        name={{
          android: "local_fire_department",
          ios: "flame.fill",
        }}
        size={12}
      />
    ),
    frozen: (
      <SymbolView
        tintColor={colorPrimary as string}
        name={{
          android: "ac_unit",
          ios: "snowflake",
        }}
        size={12}
      />
    ),
  };

  return { transactionTypeIcon };
};
