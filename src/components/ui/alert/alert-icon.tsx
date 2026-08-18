import Svg, { Path } from "react-native-svg";

interface AlertIconProps {
  size?: number;
  color?: string;
}

export const DefaultIcon = ({ size = 20, color }: AlertIconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    accessibilityElementsHidden
    importantForAccessibility="no-hide-descendants"
  >
    <Path
      d="M8 13.5a5.5 5.5 0 1 0 0-11a5.5 5.5 0 0 0 0 11M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m1-9.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-.25 3a.75.75 0 0 0-1.5 0V11a.75.75 0 0 0 1.5 0z"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </Svg>
);

export const SuccessIcon = ({ size = 20, color }: AlertIconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    accessibilityElementsHidden
    importantForAccessibility="no-hide-descendants"
  >
    <Path
      d="M13.5 8a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0m-3.9-1.55a.75.75 0 1 0-1.2-.9L7.419 8.858L6.03 7.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.13-.08z"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </Svg>
);

export const WarningIcon = ({ size = 20, color }: AlertIconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    accessibilityElementsHidden
    importantForAccessibility="no-hide-descendants"
  >
    <Path
      d="M7.134 2.994L2.217 11.5a1 1 0 0 0 .866 1.5h9.834a1 1 0 0 0 .866-1.5L8.866 2.993a1 1 0 0 0-1.732 0m3.03-.75c-.962-1.665-3.366-1.665-4.329 0L.918 10.749c-.963 1.666.24 3.751 2.165 3.751h9.834c1.925 0 3.128-2.085 2.164-3.751zM8 5a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2A.75.75 0 0 1 8 5m1 5.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </Svg>
);
