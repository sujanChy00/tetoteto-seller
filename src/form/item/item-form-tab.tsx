import { Tabs } from "@/components/ui/tabs";
import { ThemedText } from "@/components/ui/themed-text";
import { useLanguage } from "@/hooks/use-language";
import { IItemDescriptionResponse } from "@/types";
import { useState } from "react";
import { ActivityIndicator, RefreshControl, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { ItemForm } from "./item-form";
import { ItemImageSelector } from "./item-images-selector";
import { useItemForm } from "./use-item-form";

interface Props {
  copyItem?: boolean;
  item?: IItemDescriptionResponse;
  refetch?: () => Promise<any>;
  itemId?: string;
  editMode?: boolean;
}

export const ItemFormTab = ({
  copyItem = false,
  item,
  refetch,
  itemId,
  editMode = false,
}: Props) => {
  const { t } = useLanguage();
  const [value, setValue] = useState("en_US");
  const [refreshing, setRefreshing] = useState(false);
  const { Form, isPending } = useItemForm({ item, itemId, copyItem });

  return (
    <Form.AppForm>
      <Tabs
        variant="secondary"
        value={value}
        onValueChange={setValue}
        style={{ flex: 1 }}
      >
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          contentContainerClassName="py-safe-offset-6"
          stickyHeaderIndices={[0]}
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
        >
          <Tabs.List className="bg-white dark:bg-black pt-safe-offset-10">
            <Tabs.Indicator />
            <Tabs.Trigger value="en_US">
              <Tabs.Label>English</Tabs.Label>
            </Tabs.Trigger>
            <Tabs.Trigger value="ja_JP">
              <Tabs.Label className="text-[13px]">日本語</Tabs.Label>
            </Tabs.Trigger>
            <Tabs.Trigger className="flex-1" value="ne_NP">
              <Tabs.Label>नेपाली</Tabs.Label>
            </Tabs.Trigger>
            <Tabs.Trigger className="flex-1" value="vi_VN">
              <Tabs.Label>Tiếng Việt</Tabs.Label>
            </Tabs.Trigger>
          </Tabs.List>
          <View className="gap-y-6 px-4 pt-6">
            {!editMode && (
              <Form.AppField
                name="itemImages"
                children={(Field) => (
                  <ItemImageSelector
                    value={Field.state.value}
                    onChange={Field.handleChange}
                  />
                )}
              />
            )}
            <Tabs.Content value="en_US" className="pt-0">
              <View className="gap-y-6">
                <Form.AppField
                  name={"englishLanguageList.itemName"}
                  children={(Field) => <Field.TextField label={t("name")} />}
                />
                <Form.AppField
                  name={"englishLanguageList.itemTags"}
                  children={(Field) => (
                    <Field.TextField
                      label={t("item_tags")}
                      multiline
                      placeholder={t("enter_item_tags")}
                    />
                  )}
                />
                <Form.AppField
                  name={"englishLanguageList.itemDescription"}
                  children={(Field) => (
                    <Field.TextField multiline label={t("item_description")} />
                  )}
                />
              </View>
            </Tabs.Content>
            <Tabs.Content value="ja_JP" className="pt-0">
              <View className="gap-y-6">
                <Form.AppField
                  name={"japaneseLanguageList.itemName"}
                  children={(Field) => <Field.TextField label={t("name")} />}
                />
                <Form.AppField
                  name={"japaneseLanguageList.itemTags"}
                  children={(Field) => (
                    <Field.TextField
                      label={t("item_tags")}
                      multiline
                      placeholder={t("enter_item_tags")}
                    />
                  )}
                />
                <Form.AppField
                  name={"japaneseLanguageList.itemDescription"}
                  children={(Field) => (
                    <Field.TextField multiline label={t("item_description")} />
                  )}
                />
              </View>
            </Tabs.Content>
            <Tabs.Content value="ne_NP" className="pt-0">
              <View className="gap-y-6">
                <Form.AppField
                  name={"nepaliLanguageList.itemName"}
                  children={(Field) => <Field.TextField label={t("name")} />}
                />
                <Form.AppField
                  name={"nepaliLanguageList.itemTags"}
                  children={(Field) => (
                    <Field.TextField
                      label={t("item_tags")}
                      multiline
                      placeholder={t("enter_item_tags")}
                    />
                  )}
                />
                <Form.AppField
                  name={"nepaliLanguageList.itemDescription"}
                  children={(Field) => (
                    <Field.TextField multiline label={t("item_description")} />
                  )}
                />
              </View>
            </Tabs.Content>
            <Tabs.Content value="vi_VN" className="pt-0">
              <View className="gap-y-6">
                <Form.AppField
                  name={"vientameseLanguageList.itemName"}
                  children={(Field) => <Field.TextField label={t("name")} />}
                />
                <Form.AppField
                  name={"vientameseLanguageList.itemTags"}
                  children={(Field) => (
                    <Field.TextField
                      label={t("item_tags")}
                      multiline
                      placeholder={t("enter_item_tags")}
                    />
                  )}
                />
                <Form.AppField
                  name={"vientameseLanguageList.itemDescription"}
                  children={(Field) => (
                    <Field.TextField multiline label={t("item_description")} />
                  )}
                />
              </View>
            </Tabs.Content>
            <ItemForm form={Form} />
            <Form.SubmitButton disabled={isPending}>
              {isPending && (
                <ActivityIndicator
                  size={"small"}
                  colorClassName="accent-primary-foreground"
                />
              )}
              <ThemedText className="text-primary-foreground">
                {t(copyItem ? "copy" : "save")}
              </ThemedText>
            </Form.SubmitButton>
          </View>
        </KeyboardAwareScrollView>
      </Tabs>
    </Form.AppForm>
  );
};
