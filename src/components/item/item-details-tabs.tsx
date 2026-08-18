import { ItemDescription } from "@/types";
import { useState } from "react";
import { View } from "react-native";
import { Card } from "../ui/card";
import { Chip } from "../ui/chip";
import { Separator } from "../ui/separator";
import { Tabs } from "../ui/tabs";
import { ThemedText } from "../ui/themed-text";

export const ItemDetailsTabs = ({ data }: { data: ItemDescription[] }) => {
  const [tabValue, setTabValue] = useState("en_US");
  return (
    <Tabs value={tabValue} onValueChange={setTabValue} variant="primary">
      <Tabs.List>
        <Tabs.Indicator />
        <Tabs.Trigger className="flex-1" value="en_US">
          <Tabs.Label className="text-[13px]">English</Tabs.Label>
        </Tabs.Trigger>
        <Tabs.Trigger value="ja_JP">
          <Tabs.Label className="text-[13px]">日本語</Tabs.Label>
        </Tabs.Trigger>
        <Tabs.Trigger className="flex-1" value="ne_NP">
          <Tabs.Label className="text-[13px]">नेपाली</Tabs.Label>
        </Tabs.Trigger>
        <Tabs.Trigger className="flex-1" value="vi_VN">
          <Tabs.Label className="text-[13px]">Tiếng Việt</Tabs.Label>
        </Tabs.Trigger>
      </Tabs.List>
      {data.map((item) => (
        <Tabs.Content value={item.language} key={item.language}>
          <Card className="gap-5">
            <Card.Header className="gap-1">
              <ThemedText className="text-[11px] uppercase text-primary">
                PRODUCT NAME
              </ThemedText>
              <Card.Title>{item.itemName}</Card.Title>
            </Card.Header>
            <Separator />
            <Card.Body className="gap-3">
              <ThemedText className="text-[11px] uppercase">
                DESCRIPTION
              </ThemedText>
              <Card.Description className="text-sm">
                {item.itemDesc}
              </Card.Description>
            </Card.Body>
            {item.itemTags && item.itemTags?.length > 0 && (
              <>
                <Separator />
                <Card.Footer className="gap-3">
                  <ThemedText className="text-[11px] uppercase">
                    TAGS
                  </ThemedText>
                  <View className="flex-row items-center gap-2 flex-wrap">
                    {item.itemTags?.map((tag, index) => (
                      <Chip size="sm" variant="soft" key={tag + index}>
                        <Chip.Label>{tag}</Chip.Label>
                      </Chip>
                    ))}
                  </View>
                </Card.Footer>
              </>
            )}
          </Card>
        </Tabs.Content>
      ))}
    </Tabs>
  );
};
