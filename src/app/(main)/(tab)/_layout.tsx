import { useRefreshOnFocus } from "@/hooks/use-refetch-onfocus";
import { useGetUnSeenCounts } from "@/queries/chat-query";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useCSSVariable } from "uniwind";

const TabLayout = () => {
  const primaryColor = useCSSVariable("--color-primary");
  const { data, refetch } = useGetUnSeenCounts();
  useRefreshOnFocus(refetch);
  return (
    <NativeTabs
      labelVisibilityMode="labeled"
      tintColor={primaryColor as string}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon
          sf={{ default: "house", selected: "house.fill" }}
          md={{ default: "home", selected: "home_filled" }}
        />
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(order)">
        <NativeTabs.Trigger.Label>Orders</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "doc.text", selected: "doc.text.fill" }}
          md={{ default: "description", selected: "description" }}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(item)">
        <NativeTabs.Trigger.Label>Items</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "shippingbox", selected: "shippingbox.fill" }}
          md={{ default: "inventory_2", selected: "inventory_2" }}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="chat">
        <NativeTabs.Trigger.Label>Chat</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "message", selected: "message.fill" }}
          md={{ default: "message", selected: "message" }}
        />
        {!!data?.unreadCount && (
          <NativeTabs.Trigger.Badge>
            {data?.unreadCount.toString()}
          </NativeTabs.Trigger.Badge>
        )}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "person", selected: "person.fill" }}
          md={{ default: "person", selected: "person" }}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default TabLayout;
