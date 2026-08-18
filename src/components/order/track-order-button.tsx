import { useLanguage } from "@/hooks/use-language";
import { Link, useLocalSearchParams } from "expo-router";
import { SecondaryButton } from "../ui/button";

export const TrackOrderButton = () => {
  const { t } = useLanguage();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  return (
    <Link
      className="flex-1"
      asChild
      href={{
        pathname: "/order/[orderId]/track",
        params: {
          orderId,
        },
      }}
    >
      <SecondaryButton className="flex-1">
        <SecondaryButton.Label>{t("track_order")}</SecondaryButton.Label>
      </SecondaryButton>
    </Link>
  );
};
