import { useUser } from "@/hooks/use-user";
import { getAvatarName } from "@/utils/avatar-name";
import { useRouter } from "expo-router";
import { Fragment } from "react/jsx-runtime";
import { ViewAllShopButton } from "../shop/view-all-shop-button";
import { Avatar } from "../ui/avatar";
import { ListGroup } from "../ui/list-group";

export const ShopList = () => {
  const router = useRouter();
  const { user } = useUser();

  if (!user) return null;

  const shops =
    user.shopDetails.length > 6
      ? user.shopDetails.slice(0, 6)
      : user.shopDetails;

  return (
    <ListGroup>
      <ListGroup.Header>
        <ListGroup.HeaderTitle className="text-sm text-muted font-medium">
          Manage Stores
        </ListGroup.HeaderTitle>
        <ViewAllShopButton />
      </ListGroup.Header>
      <ListGroup.Body>
        {shops.map((shop, index) => {
          const isLast = index === shops.length - 1;

          return (
            <Fragment key={shop.shopId}>
              <ListGroup.Item
                className="px-4 py-2"
                onPress={() => {
                  router.push({
                    pathname: "/shop/[shopId]",
                    params: {
                      shopId: shop.shopId,
                    },
                  });
                }}
              >
                <ListGroup.ItemPrefix>
                  <Avatar>
                    <Avatar.Fallback source="">
                      {getAvatarName(shop.shopName)}
                    </Avatar.Fallback>
                  </Avatar>
                </ListGroup.ItemPrefix>
                <ListGroup.ItemContent>
                  <ListGroup.ItemTitle numberOfLines={1}>
                    {shop.shopName}
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
