import { ZoomIn } from "react-native-reanimated";
import { twMerge } from "tailwind-merge";
import { AnimatedView } from "../ui/animated-view";
import { Chip } from "../ui/chip";

interface Props {
  isCustomer: boolean;
  isAdmin: boolean;
}

export const ChatAdminLabel = ({ isCustomer, isAdmin }: Props) => {
  if (!isAdmin) return null;
  return (
    <AnimatedView
      entering={ZoomIn}
      className={twMerge(
        "absolute -top-3 z-20",
        !isCustomer ? "left-0" : "right-0",
      )}
    >
      <Chip
        size="sm"

        color="danger"
      >
        <Chip.Label>admin</Chip.Label>
      </Chip>
    </AnimatedView>
  );
};
