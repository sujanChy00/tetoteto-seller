import { useLanguage } from "@/hooks/use-language";
import { ILanguageTexts } from "@/types";
import type { LinkProps } from "expo-router";
import { useRouter } from "expo-router";
import { AndroidSymbol, SFSymbol } from "expo-symbols";
import { Fragment } from "react/jsx-runtime";
import { ListGroup } from "../ui/list-group";
import { StyledSymbolView } from "../ui/symbol-view";

const LINKS: {
  title: ILanguageTexts;
  href: LinkProps["href"];
  icon: { ios: SFSymbol; android: AndroidSymbol };
}[] = [
  {
    title: "shipping_fees",
    href: "/shipping-fee",
    icon: {
      android: "local_shipping",
      ios: "truck.box",
    },
  },
  {
    title: "shipping_campaigns",
    href: "/shipping-campaign",
    icon: {
      android: "campaign",
      ios: "megaphone",
    },
  },
  {
    title: "delivery_time_slots",
    href: "/delivery-times",
    icon: {
      android: "schedule",
      ios: "clock",
    },
  },
  {
    title: "shop_users",
    href: "/shop-users",
    icon: {
      android: "group",
      ios: "person.2",
    },
  },
];

export const ProfileLinks = () => {
  const { t } = useLanguage();
  const router = useRouter();
  return (
    <ListGroup>
      <ListGroup.Header>
        <ListGroup.HeaderTitle>Management</ListGroup.HeaderTitle>
      </ListGroup.Header>
      <ListGroup.Body>
        {LINKS.map((item, index) => {
          const isLast = index === LINKS.length - 1;

          return (
            <Fragment key={String(item.href)}>
              <ListGroup.Item
                onPress={() => {
                  router.push(item.href);
                }}
              >
                <ListGroup.ItemPrefix>
                  <StyledSymbolView
                    size={20}
                    tintColorClassName={"accent-foreground"}
                    name={{
                      android: item.icon.android,
                      ios: item.icon.ios,
                    }}
                  />
                </ListGroup.ItemPrefix>
                <ListGroup.ItemContent>
                  <ListGroup.ItemTitle numberOfLines={1}>
                    {t(item.title)}
                  </ListGroup.ItemTitle>
                </ListGroup.ItemContent>
                <ListGroup.ItemSuffix />
              </ListGroup.Item>
              {!isLast && <ListGroup.ItemSeparator />}
            </Fragment>
          );
        })}
      </ListGroup.Body>
    </ListGroup>
  );
};
