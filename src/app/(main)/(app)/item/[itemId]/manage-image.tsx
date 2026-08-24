import { PendingComponent } from "@/components/layout/pending-component";
import { FalllBackMesage } from "@/components/ui/fallback-message";
import { StyledImage } from "@/components/ui/image";
import { useRefreshOnFocus } from "@/hooks/use-refetch-onfocus";
import { useGetItemDetail } from "@/queries/item-query";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo } from "react";
import type { SortableGridRenderItem } from "react-native-sortables";
import Sortable from "react-native-sortables";

const ManageItemImageScreen = () => {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const { data, isPending, refetch } = useGetItemDetail(itemId);
  const renderItem = useCallback<SortableGridRenderItem<string>>(
    ({ item }) => <StyledImage source={item} alt={item} className="size-20" />,
    [],
  );
  useRefreshOnFocus(refetch);
  const images = useMemo(
    () =>
      data?.itemImages?.images
        ? data?.itemImages?.images?.map((img) => img)
        : [],
    [data?.itemImages?.images],
  );
  if (isPending) return <PendingComponent />;
  if (!data) return <FalllBackMesage />;
  return (
    <Sortable.Grid
      sortEnabled={true}
      showDropIndicator
      enableActiveItemSnap
      hapticsEnabled
      columns={3}
      data={images}
      renderItem={renderItem}
      rowGap={10}
      columnGap={10}
    />
  );
};

export default ManageItemImageScreen;
