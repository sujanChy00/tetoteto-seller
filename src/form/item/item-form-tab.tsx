import { PendingComponent } from "@/components/layout/pending-component";
import { Tabs } from "@/components/ui/tabs";
import { isIOS } from "@/constants/platform";
import { useGetItemDetail } from "@/queries/item-query";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { ItemForm } from "./item-form";

interface Props {
  copyItem?: boolean;
  canUpdateImage?: boolean;
}

export const ItemFormTab = ({
  copyItem = false,
  canUpdateImage = true,
}: Props) => {
  const [value, setValue] = useState("en_US");
  const [refreshing, setRefreshing] = useState(false);
  const params = useLocalSearchParams<{ itemId?: string }>();
  const { data, isPending, refetch } = useGetItemDetail(params.itemId);

  if (!!params?.itemId && isPending) return <PendingComponent />;

  return (
    <KeyboardAvoidingView
      behavior={isIOS ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerClassName="py-safe-offset-6"
        refreshControl={
          refetch ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                refetch().finally(() => setRefreshing(false));
              }}
            />
          ) : undefined
        }
        style={{ flex: 1 }}
      >
        <Tabs value={value} onValueChange={setValue}>
          <View className="px-2">
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
          </View>
          <Tabs.Content value="en_US" className="flex-1">
            <ItemForm
              canUpdateImage={canUpdateImage}
              copyItem={copyItem}
              item={data}
              langName="englishLanguageList"
            />
          </Tabs.Content>
          <Tabs.Content value="ja_JP">
            <ItemForm
              canUpdateImage={canUpdateImage}
              copyItem={copyItem}
              item={data}
              langName="japaneseLanguageList"
            />
          </Tabs.Content>
          <Tabs.Content value="ne_NP">
            <ItemForm
              canUpdateImage={canUpdateImage}
              copyItem={copyItem}
              item={data}
              langName="nepaliLanguageList"
            />
          </Tabs.Content>
          <Tabs.Content value="vi_VN">
            <ItemForm
              copyItem={copyItem}
              canUpdateImage={canUpdateImage}
              item={data}
              langName="vietnameseLanguageList"
            />
          </Tabs.Content>
        </Tabs>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
