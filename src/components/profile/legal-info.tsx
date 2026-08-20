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
    title: "terms_condition",
    href: "/terms-condition",
    icon: {
      ios: "doc.text",
      android: "description",
    },
  },
  {
    title: "privacy_policy",
    href: "/privacy-policy",
    icon: {
      ios: "hand.raised",
      android: "privacy_tip",
    },
  },
];

export const LegalInfo = () => {
  const { t } = useLanguage();
  const router = useRouter();
  return (
    <ListGroup>
      <ListGroup.Header>
        <ListGroup.HeaderTitle>Legal Info</ListGroup.HeaderTitle>
      </ListGroup.Header>
      <ListGroup.Body>
        {LINKS.map((item, index) => {
          const isLast = index === LINKS.length - 1;
          return (
            <Fragment key={String(index)}>
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
